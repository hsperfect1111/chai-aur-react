// ✅ 2. UserContextProvider.jsx – Context Provider
import React from "react";
import UserContext from "./UserContext";

const UserContextProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  // user: current user ki information (initially null, yaani koi login nahi hai).
  // setUser: user ko update karne wala function.
  // Ye sab context ke through share kiya gaya:
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {/* Yani, ab jitne bhi components is Provider ke andar honge, wo user aur setUser ko access kar sakte hain. */}
      {children}
    </UserContext.Provider>
  );
};

export default UserContextProvider;
