import { View, Text, Button, StyleSheet } from 'react-native'
import React from 'react'


export default function Home(props) {
  return (
    <View style={styles.container}>
      <Text>Temp button to navigate to the test thread</Text> 
      <Button title='Existing thread '/*<- space needed to render the button correctly on 1Plus- phones */ 
        onPress={() => props.navigation.navigate('Thread')}/> 
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});