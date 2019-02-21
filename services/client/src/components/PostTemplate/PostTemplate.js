import React from 'react';
import PropTypes from 'prop-types';

const Post = (props) => {
  return (
    <>
      <div className="content">
        <h1>{props.title}</h1>
        <p className="subtitle is-4">{new Date(props.created_time*1000).toDateString()}</p>
        <p className="content">{props.content}</p>
      </div>
      <br/>
    </>
  );
}

Post.prototype = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired,
  created_time: PropTypes.number.isRequired,
  last_updated_time: PropTypes.number
}

export default Post;