import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Pagination.css';

const Pagination = (props) => {
  console.log(classes);
  return (
    <nav className="pagination" role="navigation" aria-label="pagination">
      <Link
        to={props.prev || '/posts?page=1'}
        className="pagination-previous"
        disabled={props.prev === null}
        onClick={(e) => (props.prev || e.preventDefault())}>
        Previous
      </Link>

      <Link
        to={props.next || '#'}
        className='pagination-next'
        disabled={props.next === null}
        onClick={(e) => (props.next || e.preventDefault())}>
        Next
      </Link>

    </nav>
  );
};

Pagination.defaultProps = {
  prev: null,
  next: null
}

export default Pagination;