import { doc, getFirestore, updateDoc } from "firebase/firestore"
import { db } from '../dbConn'

const updateVotes = async (objectId, objectType, newVotes) => {
    const fireStore = getFirestore(db)
    await updateDoc(doc(fireStore, objectType, objectId), {
        upvotes: newVotes.upvotes,
        downvotes: newVotes.downvotes
    }).then(() => {
        console.log("data updated")
    }).catch((error) => {
        console.log(error)
    })
}

export function downvote(currentVotes, voteSetter, objectId, objectType) {
    var newVotes = currentVotes
    currentVotes.downvotes = currentVotes.downvotes - 1
    voteSetter({ upvotes: newVotes.upvotes, downvotes: newVotes.downvotes })
    updateVotes(objectId, objectType, newVotes)
}

export function upvote(currentVotes, voteSetter, objectId, objectType) {
    var newVotes = currentVotes
    newVotes.upvotes = newVotes.upvotes + 1
    console.log(voteSetter)
    voteSetter({ upvotes: newVotes.upvotes, downvotes: newVotes.downvotes })
    updateVotes(objectId, objectType, newVotes)
}
