import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ShopStore from "./store/ShopStore";
import UserStore from "./store/UserStore";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/font-awesome/css/font-awesome.min.css";
import CartStore from "./store/CartStore";

export const Context = createContext(null);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <Context.Provider
        value={{
            user: new UserStore(),
            shop: new ShopStore(),
            cart: new CartStore(),
        }}
    >
        <App />
    </Context.Provider>
);
