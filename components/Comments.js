import { View, Text, StyleSheet, Pressable } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons';

export default function Comments() {
return(

<Text style={styles.comment}>hello</Text>
)

}
const styles = StyleSheet.create({
 comment: {
    borderWidth: 1,
    borderColor: '#0A0A0A',
    borderRadius: 16,
    padding: 4,
    margin: 20,
    marginTop: 20,
    height: 40
}
});