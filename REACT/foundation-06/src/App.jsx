import { useState } from 'react'
import './App.css'
import Manual from './Manual'
import Hooks from './Hooks'

function App() {
  const [tab, setTab] = useState("manual")

  return (
    <>
      <h2>Learn create Tab</h2>
      <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Vel impedit laudantium nisi, quasi qui mollitia laborum, facilis quam quibusdam sit necessitatibus molestiae maxime sed velit? Temporibus reprehenderit soluta adipisci aspernatur.</p>
      <button onClick={() => setTab("manual")} >Manual</button>
      <button onClick={() => setTab("hooks")}>Hooks</button>
      {tab === "manual" ? <Manual /> : <Hooks />}
    </>
  )
}

export default App
