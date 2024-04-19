import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode';

import './addpost.styles.css';

const Addpost = () => {
  const [post, setPost] = useState({
    content: '',
  });
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPost({ ...post, [name]: value });
    error && setError(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('jwtToken');
      const decoded = jwtDecode(token);
      const userId = decoded.sub;

      const response = await fetch(`http://localhost:8080/v1/post`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          userId: userId,
          content: post.content
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add post');
      }
      if (response.ok) {
        window.location.href = '/'; 
      }
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error adding post:', error);
    }
  };

  return (
    <section>
    <a href="/" class="home-link"><h1>Odyssey</h1></a>
      <form onSubmit={handleSubmit}>
      <h2>NEW POST</h2>
        <input className='post-input'
          type="text"
          name="content"
          value={post.content}
          onChange={handleChange}
          placeholder="What's new?"
        />
        <button type="submit"> POST</button>
      </form>
      </section>
  );
};

export default Addpost;
