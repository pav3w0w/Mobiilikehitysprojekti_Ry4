import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native'
import React, { useState } from 'react'
import Constants from 'expo-constants';
import Comments from '../components/Comments';
import VoteButtons from '../components/VoteButtons';


export default function Thread() {
  const [comment, setComment] = useState("")

  const test = () => {
    console.log("Submit button pressed")
  }


  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <VoteButtons />
        <Text style={styles.title}>This will be title This will be title This will be title This will be title</Text>
      </View>
      <TextInput 
        style={styles.comment}
        placeholder="Write a comment"
        onChangeText={text => setComment(text)}
      />
      <Pressable style={styles.submitButton} onPress={test}>
        <Text style={styles.submitText}>Submit</Text>
      </Pressable>
      <Comments/>
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