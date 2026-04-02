import ChatBubble from "./ChatBubble.jsx";
import { useEffect, useRef } from "react";

function ChatWindow({ thread, messages, loading, error }) {
    const messagesEndRef = useRef(null)

    useEffect(() => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

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
                {messages.length === 0 ? (
                    <div style={{ textAlign: "center", color: "#999" }}>No messages yet</div>
                ) : (
                    messages.map((message, idx) => (
                        <ChatBubble
                            key={message.id || idx}
                            text={message.sender === "CUSTOMER"
                                ? ( message.text_original || message.text)
                                : (message.text_translated ||message.text_original || message.text)
                            }
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

