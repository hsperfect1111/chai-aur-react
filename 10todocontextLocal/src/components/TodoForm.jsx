import React, { useState } from "react";
import { useTodo } from "../contexts";
function TodoForm() {
  const [todo, setTodo] = useState("");
  const { addTodo } = useTodo();

  // 1. const add = (e) => { ... }
  // Ye ek event handler function hai — jo tab chalta hai jab tum form submit karte ho (jaise Enter dabao ya "Add" button click karo).

  // 2. e.preventDefault()
  // By default, form submit hone par page reload ho jata hai.
  // Ye line browser ko kehti hai:
  // "Page reload mat karo — main khud handle kar raha hoon."

  // 3. if (!todo) return;
  // Agar todo field empty hai (yaani user ne kuch type nahi kiya),
  // to function aage ka code skip kar dega — kuch bhi add nahi karega.

  // 🛑 Example: Agar user ne textbox me kuch nahi likha → kuch add nahi hoga.

  // 4. addTodo({ todo, completed: false });
  // Ye line new todo item create kar rahi hai:
  // { todo, completed: false } — ek object banaya ja raha hai.
  // todo: jo user ne likha
  // completed: false — kyunki naya todo abhi complete nahi hua.

  // 🚀 Ye object addTodo() function ko diya ja raha hai — jo todos list me naya todo add karta hai

  // 5. setTodo("")
  // Ye input field ko reset kar raha hai.
  // Jaise hi todo add ho gaya, textbox ko blank kar diya jaata hai.
  const add = (e) => {
    e.preventDefault();

    if (!todo) return;

    // addTodo({id: Date.now(), todo:todo, completed: false})
    addTodo({ todo, completed: false });
    setTodo("");
  };

  return (
    <form onSubmit={add} className="flex">
      <input
        type="text"
        placeholder="Write Todo..."
        className="w-full border border-black/10 rounded-l-lg px-3 outline-none duration-150 bg-white/20 py-1.5"
        // value={todo}: Input field ko todo state se link karta hai. Jo bhi todo state ka value hoga, wahi input field mein dikhai dega.
        value={todo}
        // onChange={(e) => setTodo(e.target.value)}: Jab user kuch type karega, toh todo state ko update karega with the new value of the input.
        onChange={(e) => setTodo(e.target.value)}
      />
      <button
        type="submit"
        className="rounded-r-lg px-3 py-1 bg-green-600 text-white shrink-0"
      >
        Add
      </button>
    </form>
  );
}

export default TodoForm;
