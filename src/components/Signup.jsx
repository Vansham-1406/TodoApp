import React, { useState, useEffect } from "react";
import axios from "axios";
import {useNavigate} from 'react-router-dom'
import {jwtDecode} from "jwt-decode";
import '../css/login.css'

const Signup = () => {
  const navigate = useNavigate();
  useEffect(() => {
    try {
      if (
        localStorage.getItem("token") &&
        jwtDecode(localStorage.getItem("token")).exp * 1000 < Date.now()
      ) {
        localStorage.removeItem("token");
      }

      if (
        localStorage.getItem("token") &&
        jwtDecode(localStorage.getItem("token")).exp * 1000 > Date.now()
      ) {
        navigate("/todo");
      }
    } catch (error) {
      localStorage.removeItem("token");
    }
  }, [navigate]);
  
  const [signup, setSignUp] = useState({
    email: "",
    password: "",
  });


  const handleSubmit = () => {
    if(signup.email === "")
    {
      alert("Enter email");
    }
    else if(signup.password === "")
    {
      alert("Enter password");
    }
    else
    {
      axios
        .post("http://localhost:5200/user/register", {
          email: signup.email,
          password: signup.password,
        })
        .then((res) => {
          if(res?.data?.status === true)
          {
            localStorage.setItem("token",res?.data?.token);
            navigate("/todo");
          }
        })
        .catch((err) => {
          alert(`${err.response?.data.msg}`);
        });
    }
  };
  return (
    <div
      className="login_body"
    >
      <input
        type="text"
        placeholder="Enter email id"
        style={{ height: "40px", width: "250px", paddingLeft: "10px" }}
        value={signup.email}
        onChange={(e) => {
          setSignUp({ ...signup, email: e.target.value });
        }}
      />
      <input
        type="password"
        placeholder="Enter password"
        value={signup.password}
        style={{
          height: "40px",
          width: "250px",
          paddingLeft: "10px",
          marginTop: "10px",
        }}
        onChange={(e) => {
          setSignUp({ ...signup, password: e.target.value });
        }}
      />
      <br />
      <button onClick={handleSubmit} className="btn btn-secondary">Signup</button>
    </div>
  );
};

export default Signup;
