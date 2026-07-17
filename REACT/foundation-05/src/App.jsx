import { useState } from 'react'

import './App.css'
import { useEffect } from 'react'

function App() {
  const [posts, setPosts] = useState([])
  const [status, setStatus] = useState("idel")
  const [second, setSecond] = useState(10)

  useEffect(() => {
    const timerId = setInterval(() => {
      setSecond((current) => Math.max(current-1, 0))
    }, 1000);

    return (() => {
      clearInterval(timerId)
    })
  }, [])


  useEffect(() => {

    const controller = new AbortController()

    setStatus("loading...")
    try {
      async function loadPost() {
        const response = await fetch("https://jsonplaceholder.typicode.com/posts", {signal : controller.signal})
        const data = await response.json();
        setPosts(data)
        setStatus("success")
      }
    } catch (error) {
      setStatus(error)
    }
    loadPost()

    return controller.abort()
  }, [])

  return (
    <>
      <h1>useEffect</h1>
      <h2>{second}</h2>
    </>
  )
}

export default App
