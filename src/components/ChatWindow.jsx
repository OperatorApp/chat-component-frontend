import {useThread} from "../hooks/useThread.jsx";
import ChatBubble from "./ChatBubble.jsx";
import { useEffect, useRef, useContext } from "react";
import { MessageContext } from "../context/context.jsx";

function ChatWindow() {
    const { thread, messages: threadMessages, loading, error } = useThread()
    const { messages: contextMessages } = useContext(MessageContext)
    const messagesEndRef = useRef(null)

    const allMessages = [...(threadMessages ?? []), ...(contextMessages ?? [])]

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [allMessages])

    if (loading) return <div>Loading...</div>
    if (error) return <div style={{ color: "red" }}>Error: {error}</div>
    if (!thread) return <div>No thread found</div>

    return (
        <div style={{
            height: "400px",
            width: "300px",
            border: "1px solid red",
            overflow: "auto",
            display: "flex",
            flexDirection: "column",
            padding: "10px"
        }}>
            <div style={{ flex: 1, overflowY: "auto", marginBottom: "10px" }}>
                {allMessages.length === 0 ? (
                    <div style={{ textAlign: "center", color: "#999" }}>No messages yet</div>
                ) : (
                    allMessages.map((message, idx) => (
                        <ChatBubble
                            key={message.id || idx}
                            text={message.text_original || message.text}
                            sender={message.sender}
                            timestamp={message.created_at}
                        />
                    ))
                )}
                <div ref={messagesEndRef} />
            </div>
        </div>
    )
}

export default ChatWindow

