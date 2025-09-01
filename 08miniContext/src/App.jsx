// 3. App.jsx – Wrapping App with Provider
import "./App.css";
import UserContextProvider from "./context/UserContextProvider";
import Login from "./components/Login";
import Profile from "./components/Profile";
function App() {
  return (
    // 3. App.jsx – Wrapping App with Provider
    <UserContextProvider>
      <h1>React with chai and share is important</h1>
      <Login />
      <Profile />
    </UserContextProvider>
    // Tumne pura app wrap kar diya UserContextProvider mein — iska matlab ab poore app ke components context ke user aur setUser ko use kar sakte hain.
  );
}

export default App;
