



function ChatBubble({text, sender = "unknown", timestamp}) {
    const isCustomer = sender === "customer"

    return (
        <div style={{
            marginBottom: "12px",
            padding: "8px 12px",
            borderRadius: "8px",
            maxWidth: "80%",
            wordWrap: "break-word",
            backgroundColor: isCustomer ? "#e3f2fd" : "#f5f5f5",
            alignSelf: isCustomer ? "flex-end" : "flex-start",
            marginLeft: isCustomer ? "auto" : "0",
            marginRight: isCustomer ? "0" : "auto"
        }}>
            <strong style={{ fontSize: "0.85em", color: "#666" }}>{sender}</strong>
            <p style={{ margin: "4px 0", wordBreak: "break-word" }}>{text}</p>
            {timestamp && (
                <span style={{ fontSize: "0.75em", color: "#999" }}>
                    {new Date(timestamp).toLocaleTimeString()}
                </span>
            )}
        </div>
    )
}


export default ChatBubble










