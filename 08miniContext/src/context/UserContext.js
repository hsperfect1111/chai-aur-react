// 1. UserContext.js – Context Creation

//  UserContext.js = A file that defines a user-related context in React.

// React ka "Context" feature aapko ek component se doosre components tak data bhejne mein madad karta hai, bina baar-baar props dene ke.

import React from "react";

const UserContext = React.createContext();
// Yahaan tumne ek context banaya jo globally user-related data store karega.
// Iska use har component karega jo user data read ya update kare.

export default UserContext;
