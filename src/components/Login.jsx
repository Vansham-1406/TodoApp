import React, { useState, useEffect } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import "../css/login.css";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";

const Login = () => {
  const [open, setOpen] = useState(false);
  const [passwordChg, setPasswordChg] = useState("")
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);
  const [loginValue, setLoginValue] = useState({
    email: "",
    password: "",
  });

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

  const handleSubmit = () => {
    if (loginValue.email === "") {
      alert("Enter email");
    } else if (loginValue.password === "") {
      alert("Enter password");
    } else {
      axios
        .post("http://localhost:5200/user/login", {
          email: loginValue.email,
          password: loginValue.password,
        })
        .then((res) => {
          if (res?.data?.status === true) {
            localStorage.setItem("token", res?.data?.token);
            navigate("/todo");
          }
        })
        .catch((err) => {
          alert(`${err.response?.data.msg}`);
        });
    }
  };
  return (
    <div className="login_body">
      <input
        type="text"
        placeholder="Enter email id"
        style={{ height: "40px", width: "250px", paddingLeft: "10px" }}
        value={loginValue.email}
        onChange={(e) => {
          setLoginValue({ ...loginValue, email: e.target.value });
        }}
      />
      <input
        type="password"
        placeholder="Enter password"
        value={loginValue.password}
        style={{
          height: "40px",
          width: "250px",
          paddingLeft: "10px",
          marginTop: "10px",
        }}
        onChange={(e) => {
          setLoginValue({ ...loginValue, password: e.target.value });
        }}
      />
      <br />
      <p
        style={{
          margin: "0",
          padding: "0",
          textDecoration: "underline",
          cursor: "pointer",
        }}
        className="text-light"
        onClick={onOpenModal}
      >
        Forgot Password?
      </p>
      <div className="d-flex">
        <button
          onClick={handleSubmit}
          className="border-0 ps-3 text-light pe-3 mt-3 pt-2 pb-2 btn btn-success"
        >
          Login
        </button>
        <button
          onClick={() => {
            navigate("/signup");
          }}
          className="border-0 ps-3 text-light pe-3 mt-3 pt-2 pb-2 ms-2 btn btn-primary"
        >
          Signup
        </button>
      </div>
      <Modal open={open} onClose={onCloseModal} center>
        <div className="mt-4 d-flex flex-column justify-content-center align-items-center">
          <input type="text" placeholder="Enter Email" className="ps-2 pe-2 pt-2 pb-2" onChange={(e)=>{
            setPasswordChg(e.target.value);
          }}/>
          <button style={{width:"fit-content"}} className="btn btn-primary mt-2" onClick={()=>{
            axios.post("http://localhost:5200/user/mail",{
              email : passwordChg
            })
            .then(()=>{
              alert("Password changed");
              onCloseModal()
            })
            .catch(()=>{
              alert("User does not exist");
            })
          }}>Reset Password</button>
        </div>
      </Modal>
    </div>
  );
};

export default Login;
