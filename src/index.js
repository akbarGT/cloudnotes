import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

let connectToMongo = require("./db");
const cors = require("cors");
const express = require("express");

connectToMongo();

const app = express();
const port = 5000;
///Middleware?!!?

app.use(
  cors({
    origin: "https://fancy-narwhal-4896ee.netlify.app/signup",
  })
);

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

///Available Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/notes", require("./routes/notes"));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
