import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons';

export default function VoteButtons() {
  const [posiVote, setPosiVote] = useState(0)
  const [negaVote, setNegaVote] = useState(0)


  const upvote = () => {
    setPosiVote(posiVote + 1)
  }

  const downvote = () => {
    setNegaVote(negaVote - 1)
  }
  return (
    <View style={styles.container}>
      <View >
        <Text style={styles.voteNumber}>{posiVote}</Text>
        <Text style={styles.voteNumber}>{negaVote}</Text>
      </View>
      <View >
        <Pressable onPress={upvote}>
          <AntDesign
            style={styles.voteButton} 
            name="up"
          />
        </Pressable>
        <Pressable onPress={downvote}>
          <AntDesign
            style={styles.voteButton}  
            name="down"
          />
        </Pressable>
      </View>
    </View>
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
