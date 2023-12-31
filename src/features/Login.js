// src/components/Login.js

import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './Login.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginAuth } from './Service/auth.service';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await loginAuth(username, password);
      console.log(response, "res")

      const { status, success, msg, role, userId, token } = response.data;

      if (status === 200 && success) {
        toast.success(msg);
        localStorage.setItem('token', token);
        localStorage.setItem('userId', userId);

        if (role === 'admin') {
          // alert("Welcome to admin dashboard");
          navigate('/adminDashoard'); // Navigate to admin dashboard

        } else {
          alert("Welcome to client dashboard");
        }
      } else {
        toast.error(msg);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="container-fluid">
      <div className="col-5">
        <div className="row">
          <img className="name" src="\images\loginimage.webp" alt="" width="100px" height="100px" />
          <div className="col-5">
            <form onSubmit={handleLogin}>
              <div className="imgcontainer">
                <img src="\images\celetellogo.jpg" alt="" width="100px" height="70px" />
              </div>

              <div className="container">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  placeholder="john_doe"
                  name="username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                />
              </div>
              <div className="container">
                <label htmlFor="psw">Password</label>
                <input
                  type="password"
                  placeholder="***********"
                  name="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <div className="container">
                <span className="psw"><a href="#">Forget password</a></span>
              </div>
              <button type="submit" className="btn-btn">Login</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
