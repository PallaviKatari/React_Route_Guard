import React from "react";
import ReactDOM from "react-dom";
import "./styles.css";
import App from "./App";
import { BrowserRouter as Router } from "react-router-dom";
import { AuthenticationProvider } from "./AuthUser";

const rootElement = document.getElementById("root");
const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <div className="container">
      <Router>
        <AuthenticationProvider>
          <App />
        </AuthenticationProvider>
      </Router>
    </div>
  </React.StrictMode>
);
