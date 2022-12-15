import { View, Text, Button, TextInput, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'


export default function LoginScreen({ route, navigation }) {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const auth = getAuth();

    const tryLogin = () => {
        signInWithEmailAndPassword(auth, email, password)
            .then((userCredentials) => {
                navigation.navigate('Home', { ...route, "params": { "userData": userCredentials._tokenResponse } })
            })
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
