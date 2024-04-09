import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";


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
  
  const handleNavigation = (e) => {
    navigate('/');
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
    <div className="inner">
    <div className="outer-container">
      <div className="left-panel">
      </div>
      <div className="right-panel">
        <form onSubmit={handleSubmit} className="form">
      <div className="form-wrapper">
      <label>email</label>
        <input
          className="form-control"
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
        />
      </div>
      <div className="form-wrapper">
      <label>password</label>
        <input
          className="form-control"
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
      </div>
      {error && (
        <p className="error">login.error</p>
      )}
      <div className="form-group">
        <button type="submit" className="button">nav.login</button>
        <button className="button" onClick={handleNavigation}>
        home
        </button>
      </div>
      </form>
      </div>
      </div>
    </div>
    );
}

export default SignIn;
