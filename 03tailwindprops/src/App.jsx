import { useState } from "react";
import "./App.css";

function App() {
  const [counter, setCounter] = useState(15);

  const addValue = () => {
    // ❗ NOTE:
    // When you click "Add value", the counter will go from 15 ➝ 16 only,
    // NOT 19 — because all setCounter(counter + 1) use the same stale value (15),
    // and React batches them.

    // setCounter(counter + 1);
    // setCounter(counter + 1);
    // setCounter(counter + 1);
    // setCounter(counter + 1); // Expected 19, but it will be just 16
    // Yeh 4 baar likhne pe bhi counter har bar 15 hi rahega — aur last set hoga 16 only (not 19), because React batches updates.

    // ✅ Correct way to increment by 4:
    // prevCounter : "previous value" yaani state ka latest/updated value, jo React khud provide karta hai.
    // Jab aap aise likhte ho:
    setCounter((prevCounter) => prevCounter + 1); // prev = 15 → sets to 16
    // To yeh prev automatically represent karta hai counter ka current value, chahe kitni bhi updates queue mein hoon.
    setCounter((prevCounter) => prevCounter + 1); // prev = 16 → sets to 17
    setCounter((prevCounter) => prevCounter + 1); // prev = 17 → sets to 18
    setCounter((prevCounter) => prevCounter + 1); // prev = 18 → sets to 19  // This would give you 19

    // Yahan har bar prev ko React latest value deta hai — isliye total increment hota hai +4.
  };

  const removeValue = () => {
    setCounter(counter - 1);
  };

  return (
    <>
      <h1>Chai aur react</h1>
      <h2>Counter value: {counter}</h2>

      <button onClick={addValue}>Add value {counter}</button>
      <br />
      <button onClick={removeValue}>remove value {counter}</button>
      <p>footer: {counter}</p>
    </>
  );
}

export default App;

// ✅ Use prev when:
// Aapko ek hi function ke andar multiple updates karni ho
// Aapko hamesha latest value chahiye state ka
