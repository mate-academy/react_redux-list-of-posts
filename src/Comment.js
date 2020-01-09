import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import * as originalPost from './store/originalPost';

const Comment = ({ comment, originalPost, setOriginalPost }) => {
  const removeComment = () => {
    setOriginalPost(originalPost.map(post => {
      if (comment.postId === post.id) {
        post.comments = post.comments.filter(newComments => {
          return newComments.id !== comment.id;
        });
      }
      return post;
    }));
  }
  return (
  <div>
    <h3 className="headers">
      {comment.name}
    </h3>
    <p>
      {comment.email}
    </p>
    <p>
      {comment.body}
    </p>
    <button type="button" onClick={removeComment}>
      Remove
    </button>
  </div>
)};

const getPosts = (state) => ({
  originalPost: state.originalPost,
});

const removePost = {
  setOriginalPost: originalPost.setOriginalPost,
}

Comment.propTypes = {
  comment: PropTypes.objectOf(PropTypes.any).isRequired,
  originalPost: PropTypes.arrayOf(PropTypes.any).isRequired,
  setOriginalPost: PropTypes.func.isRequired,
};

export default connect(getPosts, removePost)(Comment);
