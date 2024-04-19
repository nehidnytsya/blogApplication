import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './SignUp.styles.css';

const SignUp = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    surname: '',
    pesel: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch(`http://localhost:8080/v1/user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        navigate('/');
      }

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section>
    <a href="/" class="home-link"><h1>Odyssey</h1></a>
    <div className="head-block">
      <div className="right-block">
      </div>

      <div class="left-block">
        <h1>Sign Up</h1>
        <h3>Welcome! Please, sign up your account!</h3>
          <form onSubmit={handleSubmit} className="form"> 
            <div className="form-wrapper">
              <label>Name</label>
                <input
                  className="form-control"
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
            </div>
            <div className="form-wrapper">
              <label>Surname</label>
                <input
                  className="form-control"
                  type="text"
                  name="surname"
                  value={formData.surname}
                  onChange={handleChange}
                  required
                />
            </div>
            <div className="form-wrapper">
              <label>Pesel</label>
                <input
                  className="form-control"
                  type="text"
                  name="pesel"
                  value={formData.pesel}
                  onChange={handleChange}
                  required
                />
            </div>
            <div className="form-wrapper">
              <label>Email</label>
                <input
                  className="form-control"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
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
                  required
                />
            </div>
            <div className="form-wrapper">
              <label>Confirm password</label>
                <input
                  className="form-control"
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
            </div>
            <div className="button-wrapper">
              <button type="submit" className="btn-register">
                Register
              </button>

              <div className="already-registered">
               <p>Already have an account? <a href="/sign-in">Sign in</a></p>
                       </div>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}


export default SignUp;
