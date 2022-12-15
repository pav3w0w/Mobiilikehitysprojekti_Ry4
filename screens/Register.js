import { View, Text, Button, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth'
import { saveLogin } from '../helpers/getLoginInfo'
import Toast from 'react-native-root-toast'


export default function RegisterScreen({ route, navigation }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [rePassword, setRePassword] = useState("")
    const auth = getAuth()

    const tryRegister = () => {
        if (password == rePassword)
            createUserWithEmailAndPassword(auth, email, password)
                .then((response) => {
                    saveLogin(response._tokenResponse.idToken, response._tokenResponse.localId)
                }).then(navigation.navigate('Home')).catch((error) => {
                    if (error.message == "Error (auth/email-already-in-use).") {
                        Toast.show("Email allready in use.", {
                            duration: Toast.durations.LONG,
                        })
                    }
                }).then(() => {
                    setEmail("")
                })
        else {
            console.log("Passwords did not match")
            Toast.show('Passwords dont match', {
                duration: Toast.durations.LONG,
            })
            setPassword("")
            setRePassword("")
        }
    }

    return (
        <View style={styles.container}>
            <Text>Email:</Text>
            <TextInput
                keyboardType='email-address'
                placeholder='Email'
                onChangeText={text => setEmail(text)}
            />
            <Text>Password:</Text>
            <TextInput
                placeholder='Password'
                onChangeText={text => setPassword(text)}
                secureTextEntry={true}
                value={password}
            />
            <Text>Repeat Password:</Text>
            <TextInput
                placeholder='Repeat password'
                onChangeText={text => setRePassword(text)}
                secureTextEntry={true}
                value={rePassword}
            />
            <Button onPress={() => tryRegister()} title="Register"></Button>
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
