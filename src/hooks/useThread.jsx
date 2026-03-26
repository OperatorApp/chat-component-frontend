import { useState, useEffect } from "react"
import { getMessagesFromThread } from "../service/threadService.jsx"
import { socket } from "../context/context.jsx"

export function useThread() {
    const [thread, setThread] = useState(null)
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const username = sessionStorage.getItem("username")

        if (!username) {
            setError("No username found in session")
            setLoading(false)
            return
        }

        const existingThreadId = sessionStorage.getItem("threadId")
        if (existingThreadId === "null" || existingThreadId === "undefined") {
            sessionStorage.removeItem("threadId")
        }

        getMessagesFromThread(username)
            .then(({ thread, messages }) => {
                setThread(thread)
                setMessages(messages ?? [])
                socket.emit("join_thread", thread.id)
                console.log("Joined thread:", thread.id)
                setError(null)
            })
            .catch(err => {
                console.error("Error loading messages:", err)
                setError(err.message)
            })
            .finally(() => setLoading(false))

        // Handler for new incoming messages
        const handleNewMessage = (data) => {
            console.log("Received new message:", data)
            if (data && data.data) {
                setMessages(prev => [...prev, data.data])
            }
        }

        // Handler for send_message_response (confirmation)
        const handleMessageResponse = (data) => {
            console.log("Message response:", data)
            if (data.success && data.data) {
                setMessages(prev => [...prev, data.data])
            }
        }

        // Listen for both event types
        socket.on("new_message", handleNewMessage)
        socket.on("send_message_response", handleMessageResponse)

        return () => {
            socket.off("new_message", handleNewMessage)
            socket.off("send_message_response", handleMessageResponse)
        }
    }, [])

    return { thread, messages, loading, error }
}