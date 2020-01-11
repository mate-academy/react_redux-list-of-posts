import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actionCreators from './store';

// eslint-disable-next-line no-shadow
const Comment = ({ comment, deleteComment }) => (
  <div className="comments__item">
    <li className="comments__name">
      {comment.name}
      <span>
        <button
          type="button"
          className="post__button"
          onClick={() => deleteComment(comment.id, comment.postId)}
        >
          X
        </button>
      </span>
    </li>
    <p className="comments__email">
      By
      {' '}
      {comment.email}
    </p>
    <p className="comments__text">{comment.body}</p>
  </div>
);

const mapDispatchToProps = {
  deleteComment: actionCreators.deleteComment,
};

export default connect(null, mapDispatchToProps)(Comment);

Comment.propTypes = {
  comment: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    body: PropTypes.string,
    id: PropTypes.number,
    postId: PropTypes.number,
  }).isRequired,
  deleteComment: PropTypes.func.isRequired,
};
