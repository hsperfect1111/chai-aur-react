import React from "react";
import ReactDOM from "react-dom/client";

import App from "./App";

// ReactDOM.createRoot(...) is used to create a root for rendering a React component tree.
// document.getElementById("root") refers to the HTML element (usually a <div>)
// const root = ... stores the root instance so that you can call root.render(...) to render your app.
// createRoot rendering method hai
const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<App />) : Ye line React app ka starting point hai — isse React component (<App />) ko DOM (web page) mein render kiya jata hai.
// React component ko screen (browser) par dikhana.
root.render(<App />);

