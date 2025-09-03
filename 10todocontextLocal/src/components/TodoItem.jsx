import React, { useState } from "react";
import { useTodo } from "../contexts";
function TodoItem({ todo }) {
  // Yeh state control karta hai ki todo editable hai ya nahi. Agar true, toh todo ko edit kar sakte ho; agar false, toh wo read-only hai.
  const [isTodoEditable, setIsTodoEditable] = useState(false);
  // Yeh todo ka text store karta hai. Initial value ko prop se liya jaata hai (todo.todo), aur jab user input change karega, yeh update ho jayega.
  const [todoMsg, setTodoMsg] = useState(todo.todo);
  // Yeh useTodo hook se functions ko extract karta hai:
  // updateTodo: Todo ko update karne ke liye.
  // deleteTodo: Todo ko delete karne ke liye.
  // toggleCompleted: Todo ki completion status (done/not done) toggle karne ke liye.
  const { updateTodo, deleteTodo, toggleComplete } = useTodo();

  // editTodo function ko update karte waqt, todoMsg ko todo object ke message ke roop mein set kiya jaata hai:
  const editTodo = () => {
    // updateTodo(todo.id, {...todo, todo: todoMsg}): Yahan, existing todo object ko spread karke todoMsg ko update kiya jaata hai.
    updateTodo(todo.id, { ...todo, todo: todoMsg });
    setIsTodoEditable(false);
  };

  // toggleCompleted function mein tum todo.id ko pass kar rahe ho toggleComplete ko, jisse wo specific todo ka completed status toggle karega.
  const toggleCompleted = () => {
    toggleComplete(todo.id);
  };

  return (
    <div
      className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
        todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
      }`}
    >
      <input
        type="checkbox"
        className="cursor-pointer"
        checked={todo.completed}
        onChange={toggleCompleted}
      />
      <input
        type="text"
        className={`border outline-none w-full bg-transparent rounded-lg ${
          isTodoEditable ? "border-black/10 px-2" : "border-transparent"
        } ${todo.completed ? "line-through" : ""}`}
        value={todoMsg}
        onChange={(e) => setTodoMsg(e.target.value)}
        readOnly={!isTodoEditable}
      />
      {/* Edit, Save Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
        onClick={() => {
          if (todo.completed) return;

          if (isTodoEditable) {
            editTodo();
          } else setIsTodoEditable((prev) => !prev);
        }}
        disabled={todo.completed}
      >
        {isTodoEditable ? "📁" : "✏️"}
      </button>
      {/* Delete Todo Button */}
      <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
        onClick={() => deleteTodo(todo.id)}
      >
        ❌
      </button>
    </div>
  );
}

export default TodoItem;
