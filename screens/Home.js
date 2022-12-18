import { View, Text, Button, StyleSheet, Image } from 'react-native'
import React from 'react'
import { getLogin } from '../helpers/getLoginInfo'


export default function Home({ route, navigation }) {

  const params = route.params

  return (
    <View style={styles.container}>

    <Image style={styles.logo} source={require('../assets/Rambler.png') } />

    <View>
      <Text style={styles.btnSpacer}>Browse threads created by users here</Text>
      <Button title='Browse Threads '/*<- space needed to render the button correctly on 1Plus- phones */
        onPress={() => navigation.navigate('ThreadMenu')} />
      <Text style={styles.btnSpacer}>Create a new thread here</Text>
      <Button title='Create a thread '/*<- space needed to render the button correctly on 1Plus- phones */
        onPress={() => navigation.navigate('NewThread', { params })} />
      <Text style={styles.btnSpacer}>Test your login</Text>
      <Button title='Test login'/*<- space needed to render the button correctly on 1Plus- phones */
        onPress={async () => console.log(await getLogin())} />
    </View>
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
    margin: 15,
    textAlign: 'center',
  },
  logo:{
    resizeMode: "contain",
    height: 100,
    width: 200,
    marginBottom: 100
  }
});
