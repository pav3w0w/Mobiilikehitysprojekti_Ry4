import { View, Text, StyleSheet, TextInput, Pressable, ScrollView, RefreshControl } from 'react-native'
import React, { useState, useEffect } from 'react'
import { getLogin } from '../helpers/getLoginInfo'
import { doc, getDoc, getFirestore, updateDoc, arrayUnion, addDoc, collection, orderBy } from "firebase/firestore"
import { db } from '../dbConn'
import { upvote, downvote } from '../helpers/votes'
import Comments from '../components/Comments';
import VoteButtons from '../components/VoteButtons';
import Toast from 'react-native-root-toast'


export default function Thread({ route, navigation }) {
  const [comment, setNewComment] = useState("")
  const [title, setTitle] = useState("loading..")
  const [content, setContent] = useState("")
  const [comments, setComments] = useState([])
  const [votes, setVotes] = useState({ upvotes: 0, downvotes: 0 })
  const [isMounted, setMounted] = useState(false)
  const [refreshing, setRefreshing] = useState(true)

  const submitNewComment = () => {
    if (comment != "") {
      commentToFirebase()
    } else {
      console.log("empty string")
    }
  }

  const commentToFirebase = async () => {
    const userData = await getLogin()
    const fireStore = getFirestore(db)
    var newComment = {
      comments: [],
      content: comment,
      downvotes: 0,
      upvotes: 0,
      ownerUser: userData.id
    }
    addDoc(collection(fireStore, "comments"), newComment).then((docRef => {
      console.log("data updated")
      var commentWithoutUserData = {
        id: docRef.id,
        content: comment,
        votes: { upvotes: 0, downvotes: 0 }
      }
      comments.push(commentWithoutUserData)
      setComments([...comments])
      setNewComment("")
      updateCommentArray(route.params.threadId, docRef.id)
    })).catch((error) => {
      if (error.name == "FirebaseError") {
        Toast.show("You need to be signed in to post", {
          duration: Toast.durations.LONG
        })
      } else {
        throw error
      }
    })
  }


  const updateCommentArray = async (threadId, commentId) => {
    const fireStore = getFirestore(db)
    await updateDoc(doc(fireStore, "langat", threadId), {
      comments: arrayUnion(commentId)
    }).then(() => {
      console.log("data updated")
    }).catch((error) => {
      console.log(error)
    })
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
      var newCommentList = []
      if (docSnap.exists()) {
        var commentDetails = docSnap.data()
        newCommentList.push({
          content: commentDetails.content,
          id: docSnap.id,
          votes: { upvotes: commentDetails.upvotes, downvotes: commentDetails.downvotes }
        })
      } else {
        console.log("No such document!");
      }
    }
    newCommentList.sort(function (com) {
      if (com.votes.upvotes + com.votes.downvotes == 0)
        return -1
      return com.votes.upvotes + com.votes.downvotes
    })
    newCommentList.reverse()
    setComments(newCommentList)
    setRefreshing(false)
  }

  useEffect(() => {
    if (!isMounted) {
      getDetails(route.params.threadId)
      setMounted(true)
    }
  })


  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <VoteButtons
          votes={votes}
          upvote={() => { upvote(votes, setVotes, route.params.threadId, "langat") }}
          downvote={() => { downvote(votes, setVotes, route.params.threadId, "langat") }} />
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
      <ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={() => getDetails(route.params.threadId)} />}>
        {comments.map(com => {
          console.log(com)
          return <Comments
            key={com.id}
            comment={com.content}
            commentId={com.id}
            votes={com.votes}
          />
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
    paddingLeft: 30,
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
    backgroundColor: '#2196F3',
    width: 100,
    alignSelf: 'flex-end',
    marginRight: 20,
    borderRadius: 4

  },
  submitText: {
    fontSize: 18,
    padding: 8,
    textAlign: 'center',
    color: '#fff'
  },
});
