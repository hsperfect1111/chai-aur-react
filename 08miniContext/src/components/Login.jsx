// 4. Login.jsx – Login Form
import React, { useState, useContext } from "react";
import UserContext from "../context/UserContext";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // useContext hook to access setUser from a context called UserContext.
  // Jab tum likhte ho:

  // Yahaan tum user se username aur password le rahe ho, aur context se setUser le rahe ho:
  const { setUser } = useContext(UserContext);
  // iska matlab hai ki tum UserContext se setUser function ko le rahe ho, taaki tum kisi bhi component mein user ki information update kar sako.

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({ username, password });
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        placeholder="username"
      />{" "}
      <input
        type="text"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="password"
      />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default Login;
