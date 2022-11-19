import { View, Text, StyleSheet } from 'react-native'
import React from 'react'

export default function ThreadPreview(props) {


    return (
        <View onStartShouldSetResponder={() => props.navigation.navigate("Thread", props.data.threadId)}>
            <View style={styles.titleContainer}>
                <VoteButtons votes={props.data.votes} upvote={() => { upvote() }} downvote={() => { downvote() }} />
                <Text style={styles.title}>{props.data.title}</Text>
            </View>
            <Text style={styles.OPtext}>{props.data.content}</Text>
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
