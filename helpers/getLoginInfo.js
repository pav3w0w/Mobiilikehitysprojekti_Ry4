import * as SecureStore from 'expo-secure-store'

export async function getLogin() {
    return { "id": await SecureStore.getItemAsync("userId"), "jwt": await SecureStore.getItemAsync("jwt") }
}

export async function saveLogin(jwt, userid) {
    await SecureStore.setItemAsync("jwt", jwt)
    await SecureStore.setItemAsync("userId", userid)
}

export async function removeLogin() {
    await SecureStore.deleteItemAsync("jwt")
    await SecureStore.deleteItemAsync("userId")
}
