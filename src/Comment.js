import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteComment } from './redux/postsReducer';

const Comment = ({ postId, deleteComment, comment }) => (
  <div className="comment">
    <button
      type="button"
      className="post__delete-button"
      onClick={() => deleteComment(postId, comment.id)}
    >
      x
    </button>
    <div className="comment__name">{comment.name}</div>
    <div className="comment__body">{comment.body}</div>
    <div className="comment__email">{comment.email}</div>
    <hr />
  </div>
);

const mapDispatchToProps = {
  deleteComment,
};

export default connect(() => ({}), mapDispatchToProps)(Comment);

Comment.propTypes = {
  postId: PropTypes.number.isRequired,
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.shape({
    id: PropTypes.number,
    name: PropTypes.string,
    email: PropTypes.string,
    body: PropTypes.string,
  }).isRequired,
};
