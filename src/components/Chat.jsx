import {useState, useCallback} from "react";
import ChatWindow from "./ChatWindow.jsx";
import MessageInput from "./MessageInput.jsx";
import { MessageContext } from "../context/context.jsx";




function Chat(){
    const [open, setOpen] = useState(false)
    const [messages, setMessages] = useState([])

    const addMessage = useCallback((message) => {
        setMessages(prev => [...prev, message])
    }, [])

    return (
        <MessageContext.Provider value={{ messages, addMessage }}>
            <>
                <button onClick={() => setOpen(!open)}>OPEN TO CHAT</button>
                {open && (
                    <>
                        <ChatWindow />
                        <MessageInput />
                    </>
                )}
            </>
        </MessageContext.Provider>
    )
}



export default Chat


