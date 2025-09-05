// 1. Importing Necessary Functions:
import { createSlice, nanoid } from "@reduxjs/toolkit";
// createSlice: Ye ek function hai jo Redux Toolkit se aata hai, aur isse tum easily reducers (jo state ko change karte hain) aur actions (jo functions ko call karte hain) bana sakte ho.
// nanoid: Ye ek function hai jo tumhe unique ID generate karne mein madad karta hai. Jaise tumhe har todo ke liye alag ID chahiye, to nanoid se woh milti hai.

// 2. Defining Initial State:
const initialState = {
  todos: [{ id: 1, text: "Hello world" }],
};
// initialState: Yeh tumhara initial state hai. Matlab jab app start hoti hai, tab yeh state hoga.
// todos: Yeh ek array hai jisme tumhare todos honge. Abhi sirf ek todo hai: {id: 1, text: "Hello world"}.

// 3. Creating the Redux Slice:
export const todoSlice = createSlice({
  name: "todo", // Name of the slice
  initialState, // The initial state defined above
  // reducers: {} : isme aati h property aur function
  reducers: {
    // 4. Add Todo Action (addTodo Reducer):
    // Tumhare reducers (functions jo state ko modify karte hain) yahan define hote hain
    // addTodo: () : isme aati h do cheej state ar action
    addTodo: (state, action) => {
      const todo = {
        id: nanoid(), // Nanoid se unique ID generate karo
        text: action.payload, // Action se jo text aaye woh tumhare todo ka text hoga
      };
      state.todos.push(todo); // Ab tumhare todos array mein naya todo add kar do
    },
    // addTodo: Ye ek function hai jo naya todo add karega.
    // state: Yeh current state ko represent karta hai. Isme tumhare todos ka array hoga.
    // action: Ye jo action tum dispatch (dispatch ka matlab hai Redux store ko action bhejna taaki woh action store ke state ko update kar sake.) karte ho uska data hota hai. Isme do cheezein hoti hain:
    //      type: Ye action ka type hota hai (e.g., todo/addTodo).
    //      payload: Ye wo data hota hai jo tum action ke saath bhejte ho. Tumhare case mein ye new todo ka text hoga.
    // nanoid(): Tum har todo ko ek unique ID dene ke liye nanoid() use kar rahe ho.
    // action.payload: Ye wo text hoga jo tumne action ke saath send kiya.
    // state.todos.push(todo): Tum naya todo list mein add kar rahe ho.
    // state k andar milta h : current state of jo bhi state h
    // action k andar jo bhi data paas ho raha h

    // 5. Remove Todo Action (removeTodo Reducer):
    removeTodo: (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload);
    },
    // removeTodo: Ye function ek specific todo ko list se remove karega.
    // state: Tumhara current state jisme todos ka array hai.
    // action: Isme wo id aayegi jise tum remove karna chahte ho. Tum payload mein id pass karoge jab action dispatch karenge.
    // state.todos.filter(): Ye filter function use karte hain taaki wo todo remove ho jaye jiska id match karta ho action ke payload ke saath.
    // todo.id !== action.payload: Ye check karta hai ki agar todo ka id action ke payload se match nahi karta, to usko state mein rakho.

    // Home work : deleteTodo kaise hoga updateTodo kaise hoga
    // Yaha pr ek button lagao "Hello world wale div m" Delete wale button k paas , jaise hi update krna h woh automatically load ho jaye "Enter a Todos.." wale div m , ho jaye yaha pe aur fir ye "Add Todo" ki jagah ho jaye "Update"
  },
});
// name: 'todo': Yeh slice ka naam hai. Matlab tumhare todos ke related saari cheezein is slice mein hongi.
// initialState: Yeh state tumne upar define ki thi, aur yeh state is slice ko milti hai.
// reducers: Yahan tum functions likhte ho jo state ko modify karte hain. Tumhare case mein 2 reducers hain: addTodo aur removeTodo.

// hum is functionality (addTodo, removeTodo) k through hi state ko update karege
export const { addTodo, removeTodo } = todoSlice.actions;
// Is line ka matlab hai ki tum addTodo aur removeTodo action creators ko destructure kar rahe ho aur unhe directly export kar rahe ho, jisse tum inhe kisi bhi file mein import kar sako.

// store.js ko awareness chahiye in saare reducers k baare m
export default todoSlice.reducer;
// Ye tumhare slice ka reducer default export kar raha hai, jise tum apne Redux store mein use karoge.
