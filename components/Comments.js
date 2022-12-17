import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, { useState } from 'react'
import { upvote, downvote } from '../helpers/votes'
import { AntDesign } from '@expo/vector-icons';
import VoteButtons from '../components/VoteButtons';
export default function Comments(props) {


  const [votes, setVotes] = useState(props.votes)
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.comment}>{props.comment}</Text>
        <VoteButtons
          votes={props.votes}
          upvote={() => { upvote(props.votes, setVotes, props.commentId, "comments") }}
          downvote={() => { downvote(props.votes, setVotes, props.commentId, "comments") }}
        />
      </View>
    </View>
  )

}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 4,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#0A0A0A',

  },
  titleContainer: {
    flexDirection: 'row',
    marginTop: 8

  },
  title: {
    fontSize: 24,
    paddingLeft: 20,
    marginRight: 50,

  },
  comment: {
    borderWidth: 1,
    borderColor: '#0A0A0A',
    borderRadius: 6,
    padding: 4,
    margin: 20,
    marginTop: 20,
    height: 40,
    width: 250
  }
});
