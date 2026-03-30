import {io} from "socket.io-client";

const randomUsers = ["funnyGuy", "Anonymous",
    "Bussiness GUUYY", "ThAtGuY", "NotThisOneGuy", "NifzGuy"]

function decideUser(){
    let idx = Math.floor(Math.random()*5)
    if (idx ===3){
        ++idx
    }
    sessionStorage.setItem("username", randomUsers[idx])

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


export {decideUser}


