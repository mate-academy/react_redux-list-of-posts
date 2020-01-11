import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteComment } from './store/posts';

// eslint-disable-next-line no-shadow
const Comment = ({ comment, deleteComment, postId }) => (
  <div className="comments__item">
    <button
      type="button"
      className="post__delete"
      onClick={() => deleteComment(postId, comment.id)}
    >
      Delete comment
    </button>
    <p className="comments__text">{comment.body}</p>
    <div className="comments__author">
      <span>{comment.name}</span>
      <br />
      <span>{comment.email}</span>
    </div>
  </div>
);

export default connect(null, { deleteComment })(Comment);

Comment.propTypes = {
  comment: PropTypes.objectOf(PropTypes.any).isRequired,
  deleteComment: PropTypes.func.isRequired,
  postId: PropTypes.number.isRequired,
};
