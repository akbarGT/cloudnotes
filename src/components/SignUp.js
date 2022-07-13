import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const SignUp = (props) => {
  let navigate = useNavigate();
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassowrd: "",
  });
  ///OnChange Handler>>>

  let handleOnChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  //OnChange Handler<<<END

  //Handle SignUp Submit

  let HandleSignUp = async (e) => {
    console.log("SignUp Button Clicked");
    e.preventDefault();
    let { name, email, password } = credentials;
    const response = await fetch(
      `https://data.mongodb-api.com/app/data-wwiex/endpoint/data/v1/action/insertOne`,
      {
        method: "POST", // *GET, POST, PUT, DELETE, etc.
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
          mode: "cors",
          "api-key":
            "0Z3x93s9iLSjHCWv3qxwyHtZZ2fzHzsVCWWmM42yEYlA2qKZ6V8aQrUSeSsEcWyJ",
        },
        body: JSON.stringify({
          name,
          email,
          password,
        }), // body data type must match "Content-Type" header
      }
    );
    ///API Call<<<<<
    let res = await response.json();
    console.log(res);
    if (res.success) {
      ///redirect to Home

      ///Saving the auth-token to Local Storage / Cookie
      localStorage.setItem("token", res.authToken);
      props.showAlert(
        "Verification Email Has Been Sent To Your Email ID: Please Confirm Your Email",
        "success"
      );
      navigate("/");
    } else {
      alert('Invalid Credentials "SignUp"');
      props.showAlert("Invalid Credentials SignUp FAILED", "danger");
    }
  };

  //Handle SignUp Submit<<<<END

  return (
    <div>
      <form onSubmit={HandleSignUp}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Name:
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            aria-describedby="emailHelp"
            onChange={handleOnChange}
            name="name"
          />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email Address"
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            aria-describedby="emailHelp"
            onChange={handleOnChange}
            name="email"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">
            Password:
          </label>
          <input
            type="password"
            className="form-control"
            id="password"
            onChange={handleOnChange}
            name="password"
            required
            minLength={5}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">
            Confirm Password:
          </label>
          <input
            type="password"
            className="form-control"
            id="confirmPassword"
            onChange={handleOnChange}
            name="confirmPassword"
            required
            minLength={5}
          />
        </div>

        <button
          // disabled={credentials.password.length >= 5 ? false : true}
          type="submit"
          className="btn btn-primary"
        >
          SIGNUP &rarr;
        </button>
      </form>
    </div>
  );
};

export default SignUp;
