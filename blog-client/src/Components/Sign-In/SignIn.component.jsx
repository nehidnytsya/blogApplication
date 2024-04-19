import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";

import './SignIn.styles.css';


function SignIn() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const navigate = useNavigate();
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    error && setError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/v1/authenticate`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
          Authorization: "Basic " +  window.btoa(`${formData.email}:${formData.password}`),
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });
  
      const userData = await response.json();
      if (response.ok) {
        const jwtToken = userData.token;
        localStorage.setItem('jwtToken', jwtToken);
        navigate('/');
      } else {
        setError(true);
      }
    } catch (error) {
      console.error(error);
      setError(true);
    }
  };

  return (
    <section>
    <a href="/" class="home-link"><h1>Odyssey</h1></a>
    <div className="head-block">
      <div className="right-block-sigIn"></div>
      <div className="left-block">
      <h1>Sign In</h1>
      <h3>Please enter your login and password!</h3>
      <form onSubmit={handleSubmit} className="form">
        <div className="form-wrapper">
        <label>Email</label>
          <input
            className="form-control"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-wrapper">
        <label>Password</label>
          <input
            className="form-control"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        {error && (
          <p className="error">login.error</p>
        )}
        <div className="form-group">
          <button type="submit" className="btn-login">Sign In</button>
      
          <div className="register-now">
                <p>Not have an account? <a href="/sign-up">Sign Up</a></p>
                        </div>
        </div>
      </form>
      </div>
      </div>
    </section>
    );
}

export default SignIn;
