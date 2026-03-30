import {socket} from "../context/context.jsx"

function sendMessage(text) {
    const threadId = Number(sessionStorage.getItem("threadId"))

    if (!threadId || threadId === 0) {
        console.error("No valid thread ID found")
        return
    }
    const messageData = {
        thread_id: threadId,
        text,
        sender: "CUSTOMER"
    }

    socket.emit("send_message", messageData)
}


export {sendMessage}










