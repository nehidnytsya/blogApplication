import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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

  const handleNavigation = () => {
    navigate('/');
  };

  // Function to handle form submission
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
    <div className="inner">
      <div className="outer-container">
        <div className="left-panel">
        </div>
        <div className="right-panel">
          <form onSubmit={handleSubmit} className="form">
            <div className="form-wrapper">
              <label>name</label>
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
              <label>surname</label>
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
              <label>pesel</label>
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
              <label>email</label>
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
              <label>password</label>
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
              <label>confirm-password</label>
              <input
                className="form-control"
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>
            {/* Button for form submission */}
            <div className="button-wrapper">
              <button type="submit" className="button">
              register
              </button>
              {/* Button to navigate back to home page */}
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

export default SignUp;
