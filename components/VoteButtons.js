import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons';

export default function VoteButtons(props) {

  return (
    <View style={styles.container}>
      <View >
        <Text style={styles.voteNumber}>{props.votes.upvotes}</Text>
        <Text style={styles.voteNumber}>{props.votes.downvotes}</Text>
      </View>
      <View >
        <Pressable onPress={() => { props.upvote() }}>
          <AntDesign
            style={styles.voteButton}
            name="up"
          />
        </Pressable>
        <Pressable onPress={() => { props.downvote() }}>
          <AntDesign
            style={styles.voteButton}
            name="down"
          />
        </Pressable>
      </View>
    </View >
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F0EDED',
    flexDirection: 'row',
  },
  voteButton: {
    padding: 4,
    fontSize: 32,
  },
  voteNumber: {
    fontSize: 24,
    padding: 4,
    marginLeft: 4,
  },
});
