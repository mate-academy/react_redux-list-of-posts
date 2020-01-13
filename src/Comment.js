import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteComment } from './store';
/*eslint-disable */
const Comment = ({ comment, deleteComments }) => (
/* eslint-enable */
  <div className="all">
    <ul className="comment">
      <li className="comment__name">{comment.name}</li>
      <li className="comment__body">{comment.body}</li>
      <li className="comment__email">{comment.email}</li>
    </ul>
    <button
      type="button"
      className="comment__delete"
      onClick={() => deleteComments(comment.id)}
    >
        Remove
    </button>
  </div>
);

Comment.propTypes = {
  comment: PropTypes.shape({
    name: PropTypes.string,
    body: PropTypes.string,
    email: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  deleteComments: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
  deleteComments: id => dispatch(deleteComment(id)),
});

export default connect(null, mapDispatchToProps)(Comment);
