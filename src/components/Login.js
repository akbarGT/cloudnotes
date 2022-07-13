// import e from "cors";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  //OnChange Handler...
  const [credentials, setCredentials] = useState({ email: "", password: "" });

  ///Use History Hook
  let navigate = useNavigate();

  let handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  //OnChange Handler<<<
  let HandleLogin = async (e) => {
    console.log("Login Button Clicked");
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/login`, {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: credentials.email,
        password: credentials.password,
      }), // body data type must match "Content-Type" header
    });
    ///API Call<<<<<
    let res = await response.json();
    console.log(res);
    if (res.success) {
      ///redirect to Home

      ///Saving the auth-token to Local Storage / Cookie
      localStorage.setItem("token", res.authToken);
      navigate("/");
      props.showAlert("Logged in successfully.", "success");
    } else {
      alert("Invalid Credentials");
      props.showAlert("Invalid Details", "danger");
    }
  };

  return (
    <div>
      <form onSubmit={HandleLogin}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            value={credentials.email}
            onChange={handleOnChange}
            id="email"
            name="email"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password
          </label>
          <input
            type="password"
            className="form-control"
            value={credentials.password}
            onChange={handleOnChange}
            name="password"
            id="password"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          LogIN
        </button>
      </form>
    </div>
  );
};

export default Login;
