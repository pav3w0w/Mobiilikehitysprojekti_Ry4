import { StyleSheet, Text, TextInput, View, Pressable } from 'react-native'
import React, { useState } from 'react'

export default function NewThread() {
  const [title, setTitle] = useState("")
  const [threadText, setThreadText] = useState("")


  const Post = () => {
    console.log("Post button pressed")
    console.log("title: " + title + " text: " + threadText)
  }



  return (
    <View style={styles.container}>
      <Text style={styles.title}>Thread title</Text>
      <TextInput 
        style={styles.titleinput}
        placeholder='Enter your title here'
        onChangeText={text => setTitle(text)}
      />
      <Text style={styles.title}>Text</Text>
      <TextInput
        multiline={true}
        style={styles.tinput}
        placeholder='Enter your text here'
        onChangeText={text => setThreadText(text)}
      />
      <Pressable style={styles.postButton} onPress={Post}>
        <Text style={styles.postText}>Post</Text>
      </Pressable>
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
    backgroundColor: '#F0EDED',
    width: 100,
    alignSelf: 'flex-end',
    marginTop: 20,
  },
  postText: {
    fontSize: 18,
    padding: 8,
    textAlign: 'center',
  }, 
})