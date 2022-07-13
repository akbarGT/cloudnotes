import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import NoteState from "./context/notes/NoteState";
import React, { useState } from "react";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Alert from "./components/Alert";
const cors = require("cors");

function App() {
  ///Alert Component>>>>
  const [alert, setAlert] = useState(null);
  const showAlert = (message, type) => {
    console.log("Alert Called");
    setAlert({
      msg: message,
      type: type,
    });
    setTimeout(() => {
      setAlert(null);
    }, 4000);
  };
  ///Alert Component<<<<END
  return (
    <>
      <NoteState>
        <Router>
          <Navbar />
          <Alert alert={alert} />
          <div className="container">
            <Routes>
              <Route
                exact
                path="/"
                element={<Home showAlert={showAlert} />}
              ></Route>
              <Route
                exact
                path="/about"
                element={<About showAlert={showAlert} />}
              ></Route>
              <Route
                exact
                path="/login"
                element={<Login showAlert={showAlert} />}
              ></Route>
              <Route
                exact
                path="/signup"
                element={<SignUp showAlert={showAlert} />}
              ></Route>
            </Routes>
          </div>
        </Router>
      </NoteState>
    </>
  );
}

export default App;
