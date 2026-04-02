import {sendMessage} from "../service/messageService.jsx";
import {useState} from "react";
import {generateAndSend} from "../service/AiSimulationService.jsx";

function MessageInput(){
    const [text, setText] = useState("")

    function handleSubmit(e) {
        e.preventDefault()
        if (!text.trim()) return
        sendMessage(text)
        setText("")
    }

    async function handleAi(){
        await generateAndSend(sessionStorage.getItem("username"))
    }

    return (
        <div className={"messageBox"}>
            <form onSubmit={handleSubmit}>
            <input type="text" value={text}  onChange={e => setText(e.target.value)}
                   placeholder="Type a message..."/>
                <button type={"submit"} >send</button>
                <button onClick={handleAi}>sendAIstuff</button>
            </form>
        </div>
    )
}

export default MessageInput
