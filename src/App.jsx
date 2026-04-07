
import './App.css'
import {decideUser} from "./context/context.jsx"
import Chat from "./components/Chat.jsx";
import {pushKnowledge} from "./service/AiSimulationService.jsx";

import con1 from "../smartsupp_conversations_2023-01-01_2023-05-31_1771688499618.json"
import con2 from "../smartsupp_conversations_2023-01-01_2023-12-31_20251001-121348.json"
import con3 from "../smartsupp_conversations_2023-06-01_2023-12-31_1771688525858.json"
import con4 from "../smartsupp_conversations_2024-01-01_2024-12-31_20251001-121452.json"
import con5 from "../smartsupp_conversations_2025-01-01_2025-12-31_20251001-121557.json"


decideUser()
pushKnowledge(JSON.stringify(con1, null, 2) + "\n\n" + JSON.stringify(con2, null, 2) + "\n\n" + JSON.stringify(con3, null, 2) + "\n\n" + JSON.stringify(con4, null, 2) + "\n\n" + JSON.stringify(con5, null, 2))

function App() {

  return (
    <>
      <Chat></Chat>
    </>
  )
}

export default App
