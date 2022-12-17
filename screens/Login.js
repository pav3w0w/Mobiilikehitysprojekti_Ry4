import { View, Text, Button, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { saveLogin, removeLogin } from '../helpers/getLoginInfo'

export default function LoginScreen({ route, navigation }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const auth = getAuth();

    const tryLogout = async () => {
        getAuth().signOut()
        await removeLogin()
    }

    const tryLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                console.log(userCredentials._tokenResponse)
                saveLogin(userCredentials._tokenResponse.idToken, userCredentials._tokenResponse.localId)
            }).then(navigation.navigate('Home'))
            .catch((error) => {
                console.error(error);
            })
    }

    return (
        <View style={styles.container}>
        <View style={styles.container2}>
            <Text style={styles.textstyle} >Email:</Text>
            <TextInput  style={styles.btnSpacer2}
                keyboardType='email-address'
                placeholder='Email'
                onChangeText={text => setEmail(text)}
            />
            <Text style={styles.textstyle}>Password:</Text>
            <TextInput  style={styles.btnSpacer2}
                placeholder='Password'
                onChangeText={text => setPassword(text)}
                secureTextEntry={true}
            />
            <View style={styles.loginbtn}>
            <Button onPress={() => tryLogin()} title="Login"></Button>
            </View>
            </View>
            <View>
            <Text style={styles.btnSpacer}>Or register here</Text>
            <Button onPress={() => navigation.navigate('Register')} title="register" />
            <Text style={styles.btnSpacer}>You can log out here</Text>
            <Button  onPress={async () => await tryLogout()} title="logout" />
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
    margin: 10,
    textAlign: 'center',
    },
     btnSpacer2: {
        textAlign: 'center',
        margin:15,

        backgroundColor: '#eaeaea'
        },

     btnSpacer3: {
        textAlign: 'center',
        margin:15,
        width: 300,
        backgroundColor: '#eaeaea',

        },
     container2: {
      textAlign: 'center',
      width: 300,
     marginBottom: 80
     },
     textstyle: {
      textAlign: 'center',
     },
     loginbtn: {
     width: 200,
     alignSelf: 'center'
     }

});
