// Is code ka main purpose hai:
// React Context API ke through data ko ek jagah se poore app mein share karna.

import { createContext, useContext } from "react";

// 1. createContext – Ek context banata hai
// Yahan hum ek context object bana rahe hain jiska naam hai TodoContext.
// Imp-Ye ek global data store ki tarah kaam karega
// Imp-Isme hum Todo se related data (like todos list, addTodo function, etc.) store kar sakte hain
// Iska default value {} rakha gaya hai
export const TodoContext = createContext({
  // Tumne ab createContext ke andar ek initial value bhi de di hai:
  todos: [
    // Tum ek React Context create kar rahe ho jiska naam hai TodoContext.
    // Aur tum usko ek default value de rahe ho — jisme ek todo item hai:
    {
      id: 1,
      todo: "Todo msg",
      completed: false,
    },
  ],
  // functionality
  // Ab tumne createContext ke andar sirf todos list hi nahi, balki usse manage karne ke liye functions bhi define kar diye hain:
  addTodo: (todo) => {}, // Naya todo item list me add karta hai
  updateTodo: (id, todo) => {}, // Kisi todo item ka text update karta hai
  deleteTodo: (id) => {}, // Todo item ko delete karta hai (id ke basis pe)
  toggleComplete: (id) => {}, // Todo complete/incomplete ka toggle karta hai
});

// 2. useTodo – Ek custom hook
// Ye ek custom hook hai jiska kaam hai:
// TodoContext se value uthana easily.
// 📌 Instead of writing useContext(TodoContext) baar-baar, tum bas useTodo() likh ke value le sakte ho.
export const useTodo = () => {
  return useContext(TodoContext);
};

// 3. Todoprovider – Provider component bana rahe ho
// ➡️ Ye Provider component hai — iske andar jitne bhi React components honge, unko TodoContext ka data mil sakta hai.
export const TodoProvider = TodoContext.Provider;

// Notes
// 🧠 Context ka default value kab use hota hai?
// Jab tum useContext(TodoContext) use karte ho lekin tumne Provider nahi lagaya hota, tab ye default value use hoti hai.
// Ye ek fallback value hai — taaki app crash na ho.
