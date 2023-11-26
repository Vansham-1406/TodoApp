import React from "react";
import {useNavigate} from 'react-router-dom'
import '../css/login.css';

const Home = () => {
    const navigate = useNavigate();
  return (
    <div
      className="login_body d-flex flex-row"
    >
      <button onClick={()=>{
        navigate("/login")
      }} className="btn btn-primary me-2">Login</button>
      <button onClick={()=>{
        navigate("/signup")
      }} className="btn btn-secondary">Signup</button>
    </div>
  );
};

export default Home;
