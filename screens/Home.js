import { View, Text, Button, StyleSheet } from 'react-native'
import React from 'react'


export default function Home({ route, navigation }) {
  return (
    <View style={styles.container}>
      <Text>Browse threads created by users here</Text>
      <Button title='Browse Threads '/*<- space needed to render the button correctly on 1Plus- phones */
        onPress={() => navigation.navigate('ThreadMenu')} />
      <Text style={styles.btnSpacer}>Create a new thread here</Text>
      <Button title='Create a thread '/*<- space needed to render the button correctly on 1Plus- phones */
        onPress={() => navigation.navigate('NewThread')} />
      <Text style={styles.btnSpacer}>Test your login</Text>
      <Button title='Test login'/*<- space needed to render the button correctly on 1Plus- phones */
        onPress={() => console.log(route.params)} />
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
  btnSpacer: {
    marginTop: 10
  }
});
