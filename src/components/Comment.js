import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as postFunctions from '../reducers/PostsReducer';

const CurrComment = ({ comment, postId, deleteComment }) => (
  <li>
    <button
      type="button"
      className="delete"
      onClick={() => deleteComment(postId, comment.id)}
    >
      x
    </button>
    <p className="comment">{comment.name}</p>
    <p className="comment">{comment.body}</p>
    <p className="comment">{comment.email}</p>
  </li>
);

const getExtraMethods = dispatch => ({
  deleteComment: (postId, commentId) => dispatch(
    postFunctions.deleteComment(postId, commentId)
  ),
});

CurrComment.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  postId: PropTypes.number.isRequired,
  comment: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default connect(null, getExtraMethods)(CurrComment);
