import {snapshots, socket, userToSnapshot} from "../context/context.jsx"

function sendMessage(text) {
    const threadId = Number(sessionStorage.getItem("threadId"))
    const currentUser = sessionStorage.getItem("username")
    const idxInSnapshot = userToSnapshot[currentUser]
    const snapshot = snapshots[idxInSnapshot]

    if (!threadId || threadId === 0) {
        console.error("No valid thread ID found")
        return
    }
    const messageData = {
        thread_id: threadId,
        text,
        sender: "CUSTOMER",
        snapshot
    }

    socket.emit("send_message", messageData)
}


export {sendMessage}










