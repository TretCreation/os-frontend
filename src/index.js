import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ProductStore from "./store/ProductStore";
import UserStore from "./store/UserStore";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/font-awesome/css/font-awesome.min.css";

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Context.Provider
        value={{
            user: new UserStore(),
            product: new ProductStore(),
        }}
    >
        <App />
    </Context.Provider>
);
