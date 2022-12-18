import { doc, getFirestore, updateDoc } from "firebase/firestore"
import { db } from '../dbConn'
import Toast from 'react-native-root-toast'


const updateVotes = async (objectId, objectType, newVotes, voteSetter) => {
    const fireStore = getFirestore(db)
    await updateDoc(doc(fireStore, objectType, objectId), {
        upvotes: newVotes.upvotes,
        downvotes: newVotes.downvotes
    }).then(() => {
        voteSetter({ upvotes: newVotes.upvotes, downvotes: newVotes.downvotes })
        console.log("data updated")
    }).catch((error) => {
        if (error.name == "FirebaseError") {
            Toast.show("You need to be signed in to vote", { duration: Toast.durations.LONG })
        }
    })
}

export function downvote(currentVotes, voteSetter, objectId, objectType) {
    var newVotes = currentVotes
    currentVotes.downvotes = currentVotes.downvotes - 1
    updateVotes(objectId, objectType, newVotes, voteSetter)
}

export function upvote(currentVotes, voteSetter, objectId, objectType) {
    var newVotes = currentVotes
    newVotes.upvotes = newVotes.upvotes + 1
    updateVotes(objectId, objectType, newVotes, voteSetter)
}
