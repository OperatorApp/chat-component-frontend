
import './App.css'
import {decideUser} from "./context/context.jsx"
import Chat from "./components/Chat.jsx";


decideUser()


function App() {

  return (
    <>
      <Chat></Chat>
    </>
  )
}

export default App
