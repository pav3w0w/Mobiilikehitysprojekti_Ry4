import { StyleSheet, Text, TextInput, View, Pressable } from 'react-native'
import React, { useState } from 'react'
import { getLogin } from '../helpers/getLoginInfo'
import { db } from '../dbConn'
import { getFirestore, addDoc, collection } from "firebase/firestore"
import { RootSiblingParent } from 'react-native-root-siblings';
import Toast from 'react-native-root-toast'

export default function NewThread({ route, navigation }) {
  const [title, setTitle] = useState("")
  const [threadText, setThreadText] = useState("")


  const Post = async () => {
    if (title.length < 4) {
      console.log("title must be atleast 4 characters long")
      Toast.show('Title must be atleast 4 characters long.', {
        duration: Toast.durations.LONG,
      })
    } else {
      const userData = await getLogin()
      const fireStore = getFirestore(db)
      const docRef = await addDoc(collection(fireStore, 'langat'), {
        title: title,
        content: threadText,
        downvotes: 0,
        upvotes: 0,
        comments: [],
        ownerUser: userData.id
      }).then(() => {
        setTitle('')
        setThreadText('')
        console.log('Post saved.')
        Toast.show('Successfully posted.', {
          duration: Toast.durations.LONG,
        })
      }).catch((error) => {
        console.log(error)
        if (error.name == "FirebaseError") {
          Toast.show("You need to be signed in to post", {
            duration: Toast.durations.LONG
          })
        } else {
          throw error
        }
      })
    }
  }



  return (
    <View style={styles.container}>
      <RootSiblingParent>
        <Text style={styles.title}>Thread title</Text>
        <TextInput
          value={title}
          style={styles.titleinput}
          placeholder='Enter your title here'
          onChangeText={text => setTitle(text)}
        />
        <Text style={styles.title}>Text</Text>
        <TextInput
          value={threadText}
          multiline={true}
          style={styles.tinput}
          placeholder='Enter your text here'
          onChangeText={text => setThreadText(text)}
        />
        <Pressable style={styles.postButton} onPress={Post}>
          <Text style={styles.postText}>Post</Text>
        </Pressable>
      </RootSiblingParent>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 4,
  },
  titleinput: {
    borderWidth: 1,
    borderColor: '#0A0A0A',
    padding: 4,
  },
  tinput: {
    borderWidth: 1,
    borderColor: '#0A0A0A',
    padding: 4,
    height: 150,
  },
  title: {
    fontSize: 22,
    marginTop: 20,
  },
  postButton: {
    backgroundColor: '#2196F3',
    width: 100,
    alignSelf: 'flex-end',
    marginTop: 20,
  },
  postText: {
    fontSize: 18,
    padding: 8,
    textAlign: 'center',
    color: '#fff'
  },
})
