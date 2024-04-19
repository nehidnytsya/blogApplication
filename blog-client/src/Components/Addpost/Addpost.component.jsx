import React, { useState } from 'react';
import { jwtDecode } from 'jwt-decode';

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
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="content"
          value={post.content}
          onChange={handleChange}
          placeholder="Content"
        />
        <button type="submit">add post</button>
      </form>
    </div>
  );
};

export default Addpost;
