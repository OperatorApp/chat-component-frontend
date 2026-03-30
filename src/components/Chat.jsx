import {useState, useCallback} from "react";
import ChatWindow from "./ChatWindow.jsx";
import MessageInput from "./MessageInput.jsx";
import {useThreadMessages} from "../hooks/useThreadMessages.jsx";
import {useSocketMessages, useSocketMessageListener} from "../hooks/useSocketMessages.jsx";

function Chat(){
    const [open, setOpen] = useState(false)
    const { thread, messages, setMessages, loading, error } = useThreadMessages()

    useSocketMessages(thread?.id)

    const handleNewMessage = useCallback((message) => {
        setMessages(prev => [...prev, message])
    }, [setMessages])

    useSocketMessageListener(handleNewMessage)

    return (
        <>
            <button onClick={() => setOpen(!open)}>OPEN TO CHAT</button>
            {open && (
                <>
                    <ChatWindow thread={thread} messages={messages} loading={loading} error={error} />
                    <MessageInput addMessage={handleNewMessage} />
                </>
            )}
        </>
    )
}


export default Chat


