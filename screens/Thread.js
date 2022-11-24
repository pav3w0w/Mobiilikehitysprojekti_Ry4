import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native'
import React, { useState, useEffect } from 'react'
import { doc, getDoc, getFirestore } from "firebase/firestore"
import { db } from '../dbConn'
import Comments from '../components/Comments';
import VoteButtons from '../components/VoteButtons';


export default function Thread({ navigation, route }) {
  const [comment, setNewComment] = useState("")
  const [title, setTitle] = useState("loading..")
  const [content, setContent] = useState("")
  const [comments, setComments] = useState(["loading..."])
  const [votes, setVotes] = useState({ upvotes: 0, downvotes: 0 })
  const [isMounted, setMounted] = useState(false)

  const test = () => {
    console.log("Submit button pressed")
  }


  const downvote = () => {
    var newVotes = votes
    newVotes.downvotes = newVotes.downvotes - 1
    setVotes({ upvotes: newVotes.upvotes, downvotes: newVotes.downvotes })
  }

  const upvote = () => {
    var newVotes = votes
    newVotes.upvotes = newVotes.upvotes + 1
    setVotes({ upvotes: newVotes.upvotes, downvotes: newVotes.downvotes })
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
        <VoteButtons votes={votes} upvote={() => { upvote() }} downvote={() => { downvote() }} />
        <Text style={styles.title}>{title}</Text>
      </View>
      <Text style={styles.OPtext}>{content}</Text>
      <TextInput
        style={styles.comment}
        placeholder="Write a comment"
        onChangeText={text => setNewComment(text)}
      />
      <Pressable style={styles.submitButton} onPress={test}>
        <Text style={styles.submitText}>Submit</Text>
      </Pressable>
      <Comments />
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
