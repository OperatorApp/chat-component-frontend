import { useEffect } from "react"
import { socket } from "../context/context.jsx"

export function useSocketMessages(threadId) {
    useEffect(() => {
        if (!threadId) return

        socket.emit("join_thread", threadId)
        console.log("Joined thread:", threadId)

        return () => {

        }
    }, [threadId])
}

export function useSocketMessageListener(onMessageReceived) {
    useEffect(() => {
        const handleNewMessage = (data) => {
            console.log("Received new message:", data)
            if (data?.data) {
                onMessageReceived(data.data)
            }
        }

        socket.on("message", handleNewMessage)

        return () => {
            socket.off("message", handleNewMessage)
        }
    }, [onMessageReceived])
}


