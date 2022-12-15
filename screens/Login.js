import { View, Text, Button, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { saveLogin } from '../helpers/getLoginInfo'

export default function LoginScreen({ route, navigation }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const auth = getAuth();



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
            />
            <Button onPress={() => tryLogin()} title="Login"></Button>
            <Text>Or register here</Text>
            <Button onPress={() => navigation.navigate('Register')} title="register" />
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
