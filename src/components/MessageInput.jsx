import {sendMessage} from "../service/messageService.jsx";
import {useState, useContext} from "react";
import {MessageContext} from "../context/context.jsx";


function MessageInput(){
    const [text, setText] = useState("")
    const { addMessage } = useContext(MessageContext)

    function handleSubmit(e) {
        e.preventDefault()
        if (!text.trim()) return
        sendMessage(text, addMessage)
        setText("")
    }

    return (
        <div className={"messageBox"}>
            <form onSubmit={handleSubmit}>
            <input type="text" value={text}  onChange={e => setText(e.target.value)}
                   placeholder="Type a message..."/>
                <button type={"submit"} >send</button>
            </form>
        </div>
    )
}

export default MessageInput
