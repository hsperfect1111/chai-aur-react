// ek function hai iska use Redux store ko setup karne ke liye kiya jata hai.
import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../features/todo/todoSlice";
export const store = configureStore({
  reducer: todoReducer,
});
