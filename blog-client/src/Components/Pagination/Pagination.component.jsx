import React from 'react';

const Pagination = ({ totalPages, currentPage, onPageChange }) => {
  const pageNumbers = [];
  for (let i = 0; i < totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <ul className="pagination">
      {pageNumbers.map(number => (
        <li key={number} className={number === currentPage ? 'active' : ''}>
          <a onClick={() => onPageChange(number)}>{number + 1}</a>
        </li>
      ))}
    </ul>
  );
};

export default Pagination;