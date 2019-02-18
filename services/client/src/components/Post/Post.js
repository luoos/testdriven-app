import React from 'react';
import PropTypes from 'prop-types';

const Post = (props) => {
  return (
    <>
      <div className="content">
        <h1>{props.title}</h1>
        <p>{props.content}</p>
      </div>
      <br/>
    </>
  );
}

Post.prototype = {
  title: PropTypes.string.isRequired,
  content: PropTypes.string.isRequired
}

export default Post;