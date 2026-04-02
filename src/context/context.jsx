import {io} from "socket.io-client";

const randomUsers = ["funnyGuy", "Anonymous",
    "Bussiness GUUYY", "ThAtGuY", "NotThisOneGuy", "NifzGuy", "Kaylen", "Tristan", "Omar"]

function decideUser(){
    let idx = Math.floor(Math.random() * 3) +5
    sessionStorage.setItem("username", randomUsers[idx])
}

const userToSnapshot = {
    "Kaylen" : 0,
    "Tristan" :1,
    "Omar":2
}




const snapshots=
[
    {
        "country": "GE",
        "city": "Tbilisi",
        "local_time": "2026-04-01T14:30:00+04:00",
        "url_trail": [
            { "url": "/products/ph-probes", "ts": "2026-04-01T14:20:00+04:00" },
            { "url": "/products/ph-probe-BNC-200", "ts": "2026-04-01T14:22:00+04:00" },
            { "url": "/products/ph-probe-SMA-400", "ts": "2026-04-01T14:25:00+04:00" },
            { "url": "/shipping-info", "ts": "2026-04-01T14:28:00+04:00" }
        ],
        "cart_snapshot": {
            "items": [
                { "product_id": "PH-BNC-200", "name": "pH Probe BNC-200", "qty": 1, "price_eur": 89.90 }
            ],
            "subtotal_eur": 89.90
        },
        "sentiment_label": "neutral",
        "sentiment_conf": 0.72
    },
    {
        "country": "SE",
        "city": "Gothenburg",
        "local_time": "2026-04-01T11:15:00+02:00",
        "url_trail": [
            { "url": "/support/faq", "ts": "2026-04-01T11:00:00+02:00" },
            { "url": "/support/calibration-guide", "ts": "2026-04-01T11:05:00+02:00" },
            { "url": "/products/ph-probe-BNC-200", "ts": "2026-04-01T11:10:00+02:00" },
            { "url": "/contact", "ts": "2026-04-01T11:14:00+02:00" }
        ],
        "cart_snapshot": {
            "items": [],
            "subtotal_eur": 0
        },
        "sentiment_label": "frustrated",
        "sentiment_conf": 0.65
    },
    {
        "country": "SA",
        "city": "Riyadh",
        "local_time": "2026-04-01T13:45:00+03:00",
        "url_trail": [
            { "url": "/", "ts": "2026-04-01T13:30:00+03:00" },
            { "url": "/products", "ts": "2026-04-01T13:32:00+03:00" },
            { "url": "/products/controllers", "ts": "2026-04-01T13:35:00+03:00" },
            { "url": "/products/controller-model-x", "ts": "2026-04-01T13:38:00+03:00" },
            { "url": "/contact", "ts": "2026-04-01T13:44:00+03:00" }
        ],
        "cart_snapshot": {
            "items": [],
            "subtotal_eur": 0
        },
        "sentiment_label": "curious",
        "sentiment_conf": 0.80
    }
]

const scenariosPromts = {
    "General": "Generate your next reply as the customer. Reply with ONLY the chat message, nothing else.",
    "Kaylen" : "You are Kaylen Müller, a returning customer from Tbilisi, Georgia. You write ONLY in German. You bought buffer solutions from this shop before. Now you need a pH probe for your Hanna HI-2020 controller but you're unsure if BNC-200 or SMA-400 is the right connector. You want to pay via PayPal and need shipping to Georgia. You are polite but direct — you want clear answers, not vague ones. If the operator asks for a photo of your connector port, you are willing to send one. If they give you wrong product info, politely question it. You may switch to English if the operator seems to struggle with German, but prefer German. Keep messages short and natural like a real chat — no essays.",
    "Tristan" :"You are Tristan Lindqvist from Gothenburg, Sweden. You write in English. You bought a BNC-200 pH probe and buffer solutions (pH 7.01 and pH 4.01) from this shop 5 months ago. Your probe has started drifting — pH 7 buffer reads 7.3, pH 4 buffer reads 4.2. You recalibrated twice but drift returns within hours. Your controller is a Hanna HI-2020. You are technically competent and frustrated because you already tried the obvious fixes. If the operator suggests something you already tried, say so. Follow their troubleshooting steps honestly and report results. If it turns out the probe is defective, ask about return/warranty policy. Keep messages conversational and concise like a real support chat.",
    "Omar":"You are Omar Al-Rashid from Riyadh, Saudi Arabia. You write in English. You are a brand new customer who has never purchased from this shop. You have a controller you call \"Model X\" but you are not very technical — you don't know the connector type. You need the right pH probe for it plus a buffer calibration kit. You heard about a new-customer discount and you expect it — if the operator doesn't mention it, ask about it. You want to know estimated delivery time to Riyadh. You are friendly and patient. If asked to identify your controller more precisely or send a photo, you are willing but need guidance on what exactly to photograph. Keep messages short and natural."
}


export const socket = io("http://localhost:3001/", {
    reconnectionDelayMax: 10000,
    auth: {
        token: "123"
    },
    query: {
        "my-key": "my-value"
    }
});

socket.on("connect", () => console.log("connected to server"))
socket.on("disconnect", () => console.log("disconnected"))


export {decideUser, snapshots, userToSnapshot, scenariosPromts}


