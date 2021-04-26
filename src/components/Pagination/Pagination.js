import React from 'react';
import classnames from "classnames";
import './Pagination.css';

export const Pagination = ({ currentPage, appsPerPage, totalApps, paginate }) => {
  const pageNumbers = [];

  for (let number = 1; number <= Math.ceil(totalApps / appsPerPage); number++) {
    pageNumbers.push(number);
  }

  return (
      <div className='pagination'>
        {pageNumbers.map(number => (
          <div
            key={number}
            className={classnames("pageItem", {
              "active": currentPage === number,
            })}
            >            
			      <a onClick={() => paginate(number)} href='!#' className='pageLink'>
              {number}
            </a>
          </div>
        ))}
      </div>
  );
};

export default Pagination;