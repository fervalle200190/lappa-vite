import React from "react";
import ReactDOM from "react-dom/client";
import { HashRouter as Router } from "react-router-dom";
import App from "./App";
import { AuthProvider } from "./context";
// import './index.css'

ReactDOM.createRoot(document.getElementById("root")).render(
     <React.StrictMode>
          <AuthProvider>
               <Router>
                    <App />
               </Router>
          </AuthProvider>
     </React.StrictMode>
);
