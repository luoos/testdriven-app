import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

const PostTemplate = (props) => {
  return (
    <>
      <div className="content">
        {props.title_clickable ?
          <h1><Link to={`/post/${props.id}`}>{props.title}</Link></h1>
          :
          <h1>{props.title}</h1>
        }
        <p className="subtitle is-4">{new Date(props.created_time*1000).toDateString()}</p>
        <p className="content">{props.content}</p>
      </div>
      <br/>
    </>
  );
}

PostTemplate.defaultProps = {
  title_clickable: true
}

PostTemplate.prototype = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  created_time: PropTypes.number.isRequired,
  last_updated_time: PropTypes.number
}

export default PostTemplate;