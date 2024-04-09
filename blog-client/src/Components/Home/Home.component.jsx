import React, { useState, useEffect } from 'react';
import { useTranslation } from "react-i18next";

import Pagination from "../Pagination/Pagination.component";


const Home = () => {
    const { t } = useTranslation();
    const [posts, setPosts] = useState([]);
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);

    const handlePageChange = pageNumber => {
      setCurrentPage(pageNumber);
    };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem('jwtToken');
        const response = await fetch(`http://localhost:8080/v1/posts/${currentPage}`, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        setPosts(data.posts);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, [currentPage]);

  return (
    <div>
      <div className="product-list-container">
        <div className="product-list-header">
          <h1>{t("products")}</h1>
        </div>
        <div className="product-list">
          {posts.map(posts => (
            <div key={posts.id} className="product">
              <h3>{posts.name}</h3>
            </div>
          ))}
        </div>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Home;
