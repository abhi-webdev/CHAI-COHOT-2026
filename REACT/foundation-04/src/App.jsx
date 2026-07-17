
import { useState } from 'react';
import './App.css'

function App() {
  // let value = 5;
  let [value, setValue] = useState(5);

  function increment() {
    return setValue(value++)
  }

  function decrement() {
    return setValue(value--)
  }
  return (
    <>
      <h1>Value: {value} </h1>
      <button onClick={increment}>increment</button>
      <button onClick={decrement}>decrement</button>
    </>
  )
}

export default App
