import React from 'react';
import PropTypes from 'prop-types';
import User from '../User/User';
import CommentList from '../CommentList/CommentList';
import './Post.css';

const Post = (props) => {
  const {
    post, handleRemovePost,
  } = props;

  return (
    <div className="post">
      <button
        type="button"
        className="remove remove-post"
        onClick={() => handleRemovePost(post.id)}
      >
          ✕
      </button>
      <User user={post.user} />
      <h2 className="post__title">
        { post.title.charAt(0).toUpperCase() + post.title.slice(1) }
      </h2>
      <div className="post__body">
        { post.body.charAt(0).toUpperCase() + post.body.slice(1) }
      </div>
      <CommentList comments={post.comments} />
    </div>
  );
};

export default Post;

Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.number.isRequired,
    user: PropTypes.shape().isRequired,
    comments: PropTypes.arrayOf(
      PropTypes.shape().isRequired,
    ).isRequired,
  }).isRequired,
  handleRemovePost: PropTypes.func.isRequired,
};
