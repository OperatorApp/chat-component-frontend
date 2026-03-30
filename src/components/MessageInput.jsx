import {sendMessage} from "../service/messageService.jsx";
import {useState} from "react";

function MessageInput(){
    const [text, setText] = useState("")

    function handleSubmit(e) {
        e.preventDefault()
        if (!text.trim()) return
        sendMessage(text)
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
