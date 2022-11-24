import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native'
import React, { useState, useEffect } from 'react'
import ThreadPreview from '../components/ThreadPreview'
import { doc, collection, getDocs, getFirestore } from "firebase/firestore"
import { db } from '../dbConn'

export default function ThreadMenu({ navigation }) {
    const [threads, setThreads] = useState([])
    const [isMounted, setMounted] = useState(false)

    const getThreads = async () => {
        const fireStore = getFirestore(db)
        const threadsCollection = collection(fireStore, 'langat')
        var docArr = []
        var docs = await getDocs(threadsCollection)
        docs.forEach((document) => {
            docArr.push(document)
        })
        setThreads(docArr)
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
                {threads.map(doc => {
                    paramObj = doc.data()
                    paramObj["threadId"] = doc.id
                    return ThreadPreview(paramObj, navigation)
                })}
            </View>
        </ScrollView >
    )
}
