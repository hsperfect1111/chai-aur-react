import { useState } from 'react'
import './App.css'

function App() {

  let [counter, setCounter] = useState(15)

  // add if-else conditions in addValue and removeValue to restrict the counter value:
  // ✅ counter should not go below 0
  // ✅ counter should not go above 20

  const addValue = () => {
    if(counter < 20) {
      setCounter(counter + 1)
    } else {
      alert("Maximum limit is 20")
    }
  }

  const removeValue = () => {
    if (counter > 0) {
      setCounter(counter - 1)
    } else {
      alert("Minimum limit is 0")
    }
  }

  return (
    <>
      <h1>Chai aur react</h1>
      <h2>Counter value: {counter}</h2>

      <button onClick={addValue}>Add value {counter}</button>
      <br />
      <button onClick={removeValue}>remove value {counter}</button>
      <p>footer: {counter}</p>
      
    </>
  )
}

export default App

