import { scenariosPromts } from "../context/context.jsx";
import { getMessagesFromThread } from "./threadService.jsx";
import { sendMessage } from "./messageService.jsx";

const BASE_URL = import.meta.env.VITE_API_URL;

async function generateAndSend(username) {
    const general = scenariosPromts["General"];
    const user = scenariosPromts[username];
    const { messages } = await getMessagesFromThread(username);

    const chatHistory = messages.map(msg => ({
        role: msg.sender === "CUSTOMER" ? "assistant" : "user",
        content: msg.text_original
    }));

    const response = await fetch(`${BASE_URL}/ai/customerSimulation`, {
        method: "POST",
        headers: { "Content-Type": "application/json",
        "x-api-key": import.meta.env.VITE_API_KEY_FOR_OPERATOR},
        body: JSON.stringify({
            systemPrompt: `${user}\n${general}`,
            chatHistory
        })
    });

    const data = await response.json();
    sendMessage(data.reply);
    return data.reply;
}


async function pushKnowledge(content) {
    const apiKey = import.meta.env.VITE_API_KEY_FOR_OPERATOR

    const response = await fetch(`${BASE_URL}/ai/knowledge`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "x-api-key": apiKey
        },
        body: JSON.stringify({ content })
    })

    const data = await response.json()
    if (!data.success) throw new Error(data.error)
    return data
}




export { generateAndSend, pushKnowledge };