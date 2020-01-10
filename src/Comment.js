import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteCommentAC } from './store';

const CommentItem = ({ comment, deleteComment }) => (
  <div className="comment">
    <button
      className="button--delete"
      type="button"
      onClick={() => deleteComment(comment.id)}
    >
      Remove comment
    </button>
    <h4 className="comment--name">
      {comment.name}
    </h4>
    <div className="comment--email">
      {comment.email}
    </div>
    <p className="comment--body">{comment.body}</p>
  </div>
);

CommentItem.propTypes = {
  comment: PropTypes.shape({
    name: PropTypes.string,
    body: PropTypes.string,
    email: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  deleteComment: deleteCommentAC,
};

export default connect(null, mapDispatchToProps)(CommentItem);
