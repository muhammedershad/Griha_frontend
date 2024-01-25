import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { store } from "./Services/redux/store.ts";
import { Provider } from "react-redux";
import { SocketProvider } from "./Services/context/SocketProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
    <React.StrictMode>
        <Provider store={store}>
            <SocketProvider>
                <App />
            </SocketProvider>
        </Provider>
    </React.StrictMode>
);
