import React from 'react';

import PropTypes from 'prop-types';

import User from '../User/User';
import CommentList from '../CommentList/CommentList';

import './Post.css';

function Post({ post, deletePost }) {
  const { title, body, comments } = post;

  return (
    <div>
      <div className="post">
        <h2 className="post__title">{title}</h2>
        <p className="post__text">{body}</p>
        <User user={post.user} />
      </div>
      <button
        type="button"
        onClick={() => deletePost(post.id)}
      >
        Remove post
      </button>
      <CommentList comments={comments} />
    </div>
  );
}

const shapeAddress = PropTypes.shape({
  city: PropTypes.string,
  street: PropTypes.string,
  suite: PropTypes.string,
});

const shapePost = PropTypes.shape({
  name: PropTypes.string,
  email: PropTypes.string,
  address: shapeAddress.isRequired,
});

Post.propTypes = {
  deletePost: PropTypes.func.isRequired,
  post: PropTypes.shape({
    user: PropTypes.string,
    id: PropTypes.string,
    title: PropTypes.string,
    body: PropTypes.string,
    comments: PropTypes.arrayOf(),
    post: shapePost,
  }).isRequired,
};

export default Post;
