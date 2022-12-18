import { View, ScrollView, StyleSheet, RefreshControl } from 'react-native'
import React, { useState, useEffect } from 'react'
import ThreadPreview from '../components/ThreadPreview'
import { collection, getDocs, getFirestore } from "firebase/firestore"
import { db } from '../dbConn'

export default function ThreadMenu({ route, navigation }) {
    const [threads, setThreads] = useState([])
    const [isMounted, setMounted] = useState(false)
    const [refreshing, setRefreshing] = useState(true)

    const getThreads = async () => {
        const fireStore = getFirestore(db)
        const threadsCollection = collection(fireStore, 'langat')
        var docArr = []
        var docs = await getDocs(threadsCollection)
        docs.forEach((document) => {
            docArr.push(document)
        })
        setThreads(docArr)
        setRefreshing(false)
    }

    useEffect(() => {
        if (!isMounted) {
            getThreads()
            setMounted(true)
        }
    })

    return (
        < ScrollView refreshControl={<RefreshControl refreshing={refreshing} onRefresh={getThreads} />} style={styles.titleContainer}>
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
const styles = StyleSheet.create({
    titleContainer: {
        backgroundColor: '#fff'
    }
});
