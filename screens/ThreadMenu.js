import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import ThreadPreview from '../components/ThreadPreview'
import { doc, collection, getDocs, getFirestore } from "firebase/firestore"
import { db } from '../dbConn'

export default function ThreadMenu(navigation) {
    const [threads, setThreads] = useState("loading")
    const [isMounted, setMounted] = useState(false)

    const getThreads = async () => {
        const fireStore = getFirestore(db)
        const threadsCollection = collection(fireStore, 'langat')
        setThreads(await getDocs(threadsCollection))
    }

    useEffect(() => {
        if (!isMounted) {
            getThreads()
            setMounted(true)
        }
    })

    return (
        < ScrollView >
            <View>
                {threads.forEach(doc => {
                    ThreadPreview(doc.data(), navigation)
                })}
            </View>
        </ScrollView >
    )
}
