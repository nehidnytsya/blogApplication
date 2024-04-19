import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Home = () => {
  const [posts, setPosts] = useState([]);
  const [userId, setUserId] = useState('');

  const isLoggedIn = !!localStorage.getItem('jwtToken');

  const getUserInfo = () => {
    const token = localStorage.getItem("jwtToken")
    if(token) {
      const decoded = jwtDecode(token);
      return decoded.name;
    }
    return '';
  }

  useEffect(() => {
    const token = localStorage.getItem('jwtToken');
    if (token) {
      const decoded = jwtDecode(token);
      setUserId(decoded.sub);
    }
  }, []); 

  const handleAddPosts = () => {
    window.location.href = '/addpost'; 
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        if (!token) return; 
        const response = await fetch(`http://localhost:8080/v1/post/${userId}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        setPosts(data.post);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [userId]);

  const handleDeletePost = async (postId) => {
    console.log("postId", postId);
    try {
      const token = localStorage.getItem('jwtToken');
      const response = await fetch(`http://localhost:8080/v1/post/${postId}`, {
        method: "DELETE",
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      if (response.ok) {
        setPosts(posts.filter(posts => posts.postId !== postId));
      } else {
        console.error('Error deleting post:', postId);
      }
    } catch (error) {
      console.error('Error deleting post:', postId);
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('jwtToken');
    window.location.href = '/'; 
  };

  return (
    <div>
      <div className="post-list-container">
        <div className="post-list-header">
          <h1>Post</h1>
          <div>
            {!isLoggedIn && (
              <div>
                <Link to="/sign-up">register</Link>
                <Link to="/sign-in">login</Link>
                <h3>To see posts, please register</h3>
              </div>
            )}
            {isLoggedIn && (
              <div>
                <span>welcome, {getUserInfo()}!</span>
                <button onClick={handleLogout}>Logout</button>
                <button className="button" onClick={handleAddPosts}>Add post</button>
              </div>
            )}
          </div>
        </div>
        <div className="posts-list">
        {posts ? (
          <div className="posts-list">
            {posts.map(post => (
              <div key={post.postId} className="post"> 
                <h3>{post.content}</h3>
                {post.postId !== -1 && (
                  <button onClick={() => handleDeletePost(post.postId)}>Delete</button>
                )}
              </div>
            ))}
          </div>
        ) : (
          <p>No posts available</p>
        )}
        </div>
      </div>
    </div>
  );
};

export default Home;
