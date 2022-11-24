import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function ThreadPreview(props, navigation) {


    const shorten = (content) => {
        if (content.length > 50) {
            return content.slice(0, 47) + "..."
        }
        return content
    }

    return (
        <View onStartShouldSetResponder={() => navigation.navigate("Thread", props.threadId)}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{props.title}</Text>
            </View>
            <Text style={styles.OPtext}>{() => shorten(props.content)}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    titleContainer:
    {
        flexDirection: 'row',
    },
    title: {
        fontSize: 24,
        paddingLeft: 20,
        marginRight: 50,
    },
    OPtext: {
        fontSize: 18,
        marginTop: 20,
        marginLeft: 20,
        marginRight: 20
    },
})
