import { useState, useEffect } from "react";
import { TodoProvider } from "./contexts";
import "./App.css";
import TodoForm from "./components/TodoForm";
import TodoItem from "./components/TodoItem";

function App() {
  const [todos, setTodos] = useState([]);

  // 1. addTodo ek function hai : Ye function ek naya todo add karta hai.
  // Isme ek parameter todo aata hai (jo ek object hota hai — jaise {title: "Learn React", completed: false}).
  // 2. setTodos(...) : Ye setTodos React ka useState se aaya hua function hai — jo todo list ko update karta hai.
  // 3. (prev) => ...
  // prev matlab pehle se jo todo list thi.
  // Ye ek function hai jo pehle wali list leta hai, aur usme naye todo ko add karta hai.
  // 4. [{ id: Date.now(), ...todo }, ...prev]
  // Yeh thoda interesting hai:
  // 👉 { id: Date.now(), ...todo }
  // id: Date.now() — har todo ko ek unique ID di ja rahi hai, jo current time (milliseconds) hota hai.
  // ...todo — matlab jo bhi fields tumne diye hain (like title, completed), wo saare yahan copy ho jaate hain.
  // Example:
  // Agar todo = { title: "Buy milk", completed: false } ho,
  // Toh ye ban jaayega:
  // { id: 1693557789892, title: "Buy milk", completed: false }
  // 👉 [ newTodo, ...prev ] : Ye line kya kar rahi hai?
  // Naya todo list ke beginning me add kar rahi hai.
  // ...prev ka matlab hai: baaki purani todos.
  const addTodo = (todo) => {
    setTodos((prev) => [{ id: Date.now(), ...todo }, ...prev]);
  };

  // 1. updateTodo function kya karta hai?
  // Ye function kisi specific todo item ko update karta hai — based on its id.
  // 2. id aur todo kya hain?
  // id → Jis todo ko update karna hai uska ID.
  // todo → Naya todo object jo replace karna hai (e.g., { id: 5, title: "Updated title", completed: true })
  // prev = purani todos ki list.
  // map(...) → har todo item pe loop chalata hai.
  // prevTodo.id === id → har todo ka id check karta hai:
  // Agar match karta hai, to us todo ko replace kar do todo se.
  // Agar match nahi karta, to use as-is (waise ka waisa) chhod do.
  const updateTodo = (id, todo) => {
    setTodos((prev) =>
      prev.map((prevTodo) => (prevTodo.id === id ? todo : prevTodo))
    );
  };

  // .filter value ko aane deta h
  // 1. deleteTodo function kya karta hai?
  // Ye function ek todo item ko delete/remove karta hai — based on its id.
  // 2. setTodos(...)
  // Ye useState ka update function hai, jo todos list ko update karta hai.
  // 3. prev.filter(...)
  // prev = purani list of todos.
  // .filter(...) ek nayi list banata hai sirf un items ki, jinka id !== id (yaani jo delete nahi hone waale hain).
  // Agar tum call karte ho:
  // deleteTodo(2);
  // Toh .filter() kya karega?
  // ✅ Sirf un todos ko rakhega jinka id !== 2.
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  // 1. Function ka kaam:
  // Ye function ek specific todo item ka completed status on/off karta hai — yaani true ko false, aur false ko true.
  // 👉 setTodos(...)
  // Todos ki purani list ko update kar raha hai.
  // 👉 .map(...)
  // Har todo item pe loop chala raha hai.
  // 👉 prevTodo.id === id
  // Dekh raha hai: kya current todo ka id match kar raha hai user ke diye gaye id se?
  // 👉 { ...prevTodo, completed: !prevTodo.completed }
  // Agar match ho gaya:
  // To ek naya object banaya jaa raha hai — sab kuch same, sirf completed field ka value ulta kar diya (true → false ya false → true).
  // 👉 : prevTodo
  // Agar match nahi hua:
  // To todo ko waise ka waisa hi chhod diya.
  const toggleComplete = (id) => {
    setTodos((prev) =>
      prev.map((prevTodo) =>
        prevTodo.id === id
          ? { ...prevTodo, completed: !prevTodo.completed }
          : prevTodo
      )
    );
  };

  // https://www.w3schools.com/jsref/prop_win_localstorage.asp
  // localStorage.getItem() : ye value hoti h string m... hume json m chahiye
  // 1. useEffect(() => { ... }, [])
  // Ye React ka hook hai jo component mount (Jab component pehli baar screen pe load hota hai (appear hota hai).) hone ke baad chal jaata hai (sirf ek baar).
  // Kyunki dependency array [] hai, iska matlab:
  // ✅ Ye effect sirf component load hone par chalega, baar-baar nahi.
  // 2. localStorage.getItem("todos")
  // • Browser ke localStorage se "todos" naam ki cheez uthai ja rahi hai.
  // • Ye ek string hoti hai, jaise:
  // '[{"id":1,"title":"Buy milk","completed":false}]'
  // 3. JSON.parse(...)
  // • localStorage string return karta hai.
  // • JSON.parse() use JavaScript object/array mein convert karta hai.
  // 4. if (todos && todos.length > 0)
  // Ye check karta hai:
  // • todos null ya undefined to nahi hai?
  // • Aur usme kuch items hain?
  // Agar haan, to:
  // setTodos(todos)
  useEffect(() => {
    // JSON.parse Directly javascript deta h
    const todos = JSON.parse(localStorage.getItem("todos"));

    if (todos && todos.length > 0) {
      setTodos(todos);
    }
  }, []);

  // 1. useEffect(() => { ... }, [todos])
  // • Jab bhi todos state change hoti hai (naya todo add, delete, update, ya toggle),
  // • Ye useEffect automatically chal jaata hai.
  // 2. localStorage.setItem("todos", JSON.stringify(todos))
  // • Ye tumhare current todos array ko string me convert karke (JSON format me),
  // • Browser ke localStorage me "todos" key ke under save kar deta hai.
  useEffect(() => {
    // JSON.stringify ye sb kuch string m convert kr deta h
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  return (
    // 👉 TodoProvider ek React Context Provider hai.
    // Jab tum isse apne App ke upar wrap karte ho, to:
    // Sabhi child components ko todos aur related functions (addTodo, deleteTodo, etc.) ka access mil jaata hai, bina props pass kiye.
    // 🔥 Tumhara question:
    // "Kaunse child components ko todos aur related functions ka access milega?"
    // ✅ Simple Answer:
    // Jitne bhi components TodoProvider ke andar hain, un sab ko todos, addTodo(), deleteTodo(), etc. ka access milega — using useTodo().
    <TodoProvider
      value={{ todos, addTodo, updateTodo, deleteTodo, toggleComplete }}
    >
      <div className="bg-[#172842] min-h-screen py-8">
        <div className="w-full max-w-2xl mx-auto shadow-md rounded-lg px-4 py-3 text-white">
          <h1 className="text-2xl font-bold text-center mb-8 mt-2">
            Manage Your Todos
          </h1>
          <div className="mb-4">
            {/* Todo form goes here */}
            <TodoForm />
          </div>
          <div className="flex flex-wrap gap-y-3">
            {/*Loop and Add TodoItem here */}
            {/* Ye code todos.map() ke through todos array ke har item (todo) ko iterate karta hai. Har todo ko TodoItem component ke through render kiya jaata hai. */}
            {/* 1. todos.map((todo) => ...):
            Ye array ke har item (todo) ko process karta hai.
            Har todo item ke liye ek div create hota hai. */}
            {/* 2. key={todo.id}:
            React ko batata hai ki har item ko uniquely identify kaise kare (performance ke liye zaroori hai).
            Yahan, todo.id ko key diya jaata hai. */}
            {/* 3. <TodoItem todo={todo}/>:
            Har todo ko TodoItem component ko pass kiya jaata hai as a prop, jisse TodoItem apne andar todo ko render kar sake. */}
            {todos.map((todo) => (
              <div key={todo.id} className="w-full">
                <TodoItem todo={todo} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </TodoProvider>
  );
}

export default App;

// Notes:

// 🔹 useState — Jab state (data) maintain karna ho

// Use useState when:
// Aapko kisi component ke andar data store karna hai.
// Aur jab wo data change ho, to component dobara render hona chahiye.

// ✅ Examples:

// 1. Counter app (count increase/decrease karna)
// 2. Form inputs ka data handle karna
// 3. Button click ka status (like toggle ON/OFF)

// const [count, setCount] = useState(0);

// // Update:
// setCount(count + 1);

// 🔹 useEffect — Jab side effects handle karne ho

// Use useEffect when:
// Aapko component render hone ke baad kuch karna ho (side effects).

// Jaise:
// API call karna
// Event listener lagana / hatana
// Local storage access
// DOM ko manually manipulate karna

// ✅ Examples:
// 1. Component load hote hi data fetch karna
// 2. Kisi prop ya state ke change pe koi kaam karna
// 3. Timer set karna ya cleanup karna

// jsx
// useEffect(() => {
//   // fetch data from API
//   fetchData();
// }, []); // Empty dependency array = only on mount

// Ya agar kisi state ke change pe react karna ho:

// jsx
// useEffect(() => {
//   console.log("Count changed:", count);
// }, [count]);

// Ek line me difference:

// useState = Data store karo
// useEffect = Jab data ya component change ho, tab kuch "effect" karo

// "Mount" ka matlab React me kya hota hai?

// Mount = Jab component pehli baar screen pe load hota hai (appear hota hai).

// React lifecycle ke 3 main phases hote hain:

// 1. Mount – Component create hota hai aur DOM me insert hota hai
// 2. Update – Component ka state ya props change hote hain
// 3. Unmount – Component screen se hata diya jata hai (destroy)
