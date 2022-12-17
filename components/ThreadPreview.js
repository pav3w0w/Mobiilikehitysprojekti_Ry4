import { View, Text, StyleSheet } from 'react-native'
import React from 'react'


export default function ThreadPreview(props, navProp) {

    const shorten = (content) => {
        if (content.length > 50) {
            return content.slice(0, 40) + "..."

        }
        return content
    }

    return (
        <View
            style={styles.ThreadPreview}
            onTouchEnd={() => navProp.navigate('Thread', { screen: 'Thread', threadId: props.threadId })}
            key={props.threadId}
        >
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{props.title}</Text>
            </View>
            <Text style={styles.OPtext}>{shorten(props.content)}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    ThreadPreview: {
        margin: 6,
        paddingTop: 20,
        borderBottomWidth: 3,
        paddingBottom: 20,
        borderColor: '#2196F3',
        backgroundColor: '#fff'
    },
    titleContainer:
    {
        flexDirection: 'row',
        borderWidth: 0,
            borderColor: '#0A0A0A',
    },
    title: {
        fontSize: 24,
        paddingLeft: 20,
        marginRight: 50,
    },
    OPtext: {

        fontSize: 18,
        marginTop: 10,
        marginLeft: 20,
        marginRight: 20
    },
})
