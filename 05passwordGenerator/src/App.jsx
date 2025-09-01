import { useCallback, useState, useEffect, useRef } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [numberAllowed, setNumberAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");

  // useRef hook
  const passwordRef = useRef(null);

  // useCallback se hum har cheez ko optimize krne ki kosish kr rahe h
  // passwordGenerator method :
  // useCallback function ko memorize krta h jitna ho sake
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";

    if (numberAllowed) str += "0123456789";
    if (charAllowed) str += "!@#$%^&*_+=[]{}~`";

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(char);
    }

    setPassword(pass);
  }, [length, numberAllowed, charAllowed, setPassword]);

  // copyToClipboard method kaise kiya jata h
  const copyPasswordToClipboard = useCallback(() => {
    // passwordRef kaise lete h ?
    passwordRef.current?.select();
    passwordRef.current?.setSelectionRange(0, 9);
    // copyPasswordToClipboard kaise hota h
    window.navigator.clipboard.writeText(password);
  }, [password]);
  useEffect(() => {
    passwordGenerator();
  }, [length, numberAllowed, charAllowed, passwordGenerator]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-3 my-8 text-orange-500 bg-gray-800">
        <h1 className="text-white text-center my-3">Password generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            type="text"
            value={password}
            className="outline-none w-full py-1 px-3"
            placeholder="Password"
            readOnly
            ref={passwordRef}
          />
          <button
            onClick={copyPasswordToClipboard}
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
          >
            copy
          </button>
        </div>
        <div className="flex text-sm gap-x-2">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={numberAllowed}
              id="numberInput"
              onChange={() => {
                setNumberAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="characterInput"
              onChange={() => {
                setCharAllowed((prev) => !prev);
              }}
            />
            <label htmlFor="characterInput">Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;

// Notes:

// https://react.dev/reference/react/useCallback

// useCallback syntax :
// useCallback(fn, dependencies)
// useCallback ek React hook hai jo tumhare function ko yaad rakhta hai,
// taaki har baar component re-render hone par woh dubara na baney (re-create na ho).
// re-render:( Jab React dubara se component ko run karta hai aur UI ko update karta hai, toh us process ko re-render kehte hain. )

// React mein component ek function ya class hota hai jo UI (User Interface) ka ek hissa return karta hai—jaise ki button, form, ya poora page bhi ho sakta hai.
// Simple shabdon mein:
// Component ek chhota, reuse hone wala code block hota hai jo HTML (ya JSX) ko return karta hai, jise React use karta hai screen par kuch dikhane ke liye.

// Class	          Effect
// w-full	          Sets the width to 100% of the parent container.
// max-w-md	        Sets the maximum width of the element to a predefined medium size (md ≈ 28rem or 448px).
// mx-auto	        Applies horizontal margin auto, centering the element horizontally.
// px-4	            Adds horizontal padding of 1rem (16px) on both sides (left and right).
// my-8	            Adds vertical margin (2rem / 32px) to the top and bottom.

// https://react.dev/reference/react/useEffect

// Question: Why is setPassword in the dependency array?

// 🧠 Explanation:

// React’s useCallback and useEffect dependency arrays are used to tell React:

// "Re-run or re-create this function only if these dependencies change."

// Now, regarding setPassword:

// It's provided by useState, like this:

// const [password, setPassword] = useState("");

// React guarantees that setPassword is stable — meaning it will never change between renders.
