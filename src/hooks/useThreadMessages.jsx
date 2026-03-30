import { useState, useEffect } from "react"
import { getMessagesFromThread } from "../service/threadService.jsx"

export function useThreadMessages() {
    const [thread, setThread] = useState(null)
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const username = sessionStorage.getItem("username")

        if (!username) {
            setLoading(false)
            setError("No username found in session")
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
                setError(null)
            })
            .catch(err => {
                console.error("Error loading messages:", err)
                setError(err.message)
            })
            .finally(() => setLoading(false))
    }, [])

    return { thread, messages, setMessages, loading, error }
}