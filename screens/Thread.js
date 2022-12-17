import { View, Text, StyleSheet, TextInput, Pressable, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getLogin } from '../helpers/getLoginInfo'
import { doc, getDoc, getFirestore, updateDoc, arrayUnion, addDoc, collection } from "firebase/firestore"
import { db } from '../dbConn'
import Comments from '../components/Comments';
import VoteButtons from '../components/VoteButtons';


export default function Thread({ route, navigation }) {
  const [comment, setNewComment] = useState("")
  const [commentlist, addComment] = useState([])
  const [title, setTitle] = useState("loading..")
  const [content, setContent] = useState("")
  const [comments, setComments] = useState(["loading..."])
  const [votes, setVotes] = useState({ upvotes: 0, downvotes: 0 })
  const [isMounted, setMounted] = useState(false)

  const submitNewComment = () => {
    if (comment != "") {
      commentToFirebase()
    }else {
      console.log("empty string")
    }
  }

  const commentToFirebase = async() => {
    const userData = await getLogin()
    const fireStore = getFirestore(db)
    const docRef = await addDoc(collection(fireStore, "comments"), {
      comments : [],
      content : comment,
      downvotes : 0,
      upvotes : 0,
      ownerUser : userData.id
    }).catch(error => console.log(error)) 
      console.log("data updated")
      comments.push(comment)
      setComments([...comments])
      setNewComment("")
      updateCommentArray(route.params.threadId, docRef.id)
  }
  
  
  const updateCommentArray = async(threadId, commentId) => {
    const fireStore = getFirestore(db)
    await updateDoc(doc(fireStore, "langat", threadId), {
      comments: arrayUnion(commentId)
    }).then(() => {
      console.log("data updated")
    }).catch((error) => {
      console.log(error)
    })
  }


  const downvote = () => {
    var newVotes = votes
    newVotes.downvotes = newVotes.downvotes - 1
    setVotes({ upvotes: newVotes.upvotes, downvotes: newVotes.downvotes })
    updateVotes(route.params.threadId, newVotes)
  }

  const upvote = () => {
    var newVotes = votes
    newVotes.upvotes = newVotes.upvotes + 1
    setVotes({ upvotes: newVotes.upvotes, downvotes: newVotes.downvotes })
    updateVotes(route.params.threadId, newVotes)
  }

  const getDetails = async (threadId) => {
    const fireStore = getFirestore(db)
    const threadRef = doc(fireStore, 'langat', threadId)
    const details = await getDoc(threadRef)
    if (details.exists()) {
      data = details.data()
      setTitle(data.title)
      setVotes({ upvotes: data.upvotes, downvotes: data.downvotes })
      setContent(data.content)
    }
    else {
      console.log("Error fetching thread with id: " + threadId)
    }
    for (let index = 0; index < details.data().comments.length; index++) {
      const commentRef = doc(fireStore, "comments", details.data().comments[index]);
      const docSnap = await getDoc(commentRef);
      if (docSnap.exists()) {
        commentlist.push(docSnap.data().content)
        } else {
          console.log("No such document!");
        }
    }
    setComments(commentlist)
  }

  useEffect(() => {
    if (!isMounted) {
      getDetails(route.params.threadId)
      setMounted(true)
    }
  })

  const updateVotes = async (threadId, newVotes) => {
    const fireStore = getFirestore(db)
    await updateDoc(doc(fireStore, "langat", threadId), {
      upvotes: newVotes.upvotes, 
      downvotes: newVotes.downvotes
    }).then(() => {
      console.log("data updated")
    }).catch((error) => {
      console.log(error)
    })
  }

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <VoteButtons votes={votes} upvote={() => { upvote() }} downvote={() => { downvote() }} />
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.OPtext}>{content}</Text>
      <TextInput
        style={styles.comment}
        placeholder="Write a comment"
        onChangeText={text => setNewComment(text)}
        value={comment}
      />
      <Pressable style={styles.submitButton} onPress={submitNewComment}>
        <Text style={styles.submitText}>Submit</Text>
      </Pressable>
      <ScrollView>
        {comments.map(com => {
          return <Comments comment={com} />
        })}
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 4,
  },
  titleContainer: {
    flexDirection: 'row',
  },
  title: {
    fontSize: 24,
    paddingLeft: 20,
    marginRight: 50,
  },
  OPtext: {
    fontSize: 18,
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20
  },
  comment: {
    borderWidth: 1,
    borderColor: '#0A0A0A',
    padding: 4,
    margin: 20,
    marginTop: 20,
    height: 100
  },
  submitButton: {
    backgroundColor: '#F0EDED',
    width: 100,
    alignSelf: 'flex-end',
    marginRight: 20,
  },
  submitText: {
    fontSize: 18,
    padding: 8,
    textAlign: 'center',
  },
});
