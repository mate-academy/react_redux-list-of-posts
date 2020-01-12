import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  handleRemoveComment
} from '../redux/actions';

const Comment = ({ comment, removeComment }) => (
  <div className="comment">
    <div className="comment-title">
      <span
      className='delete-comments'
      role='img'
      aria-label="cancel"
      onClick={() => removeComment(comment.id)}
    >
      ❌
    </span>
    <p className="comment-title__id">
      {'Comment - '}
      {comment.id}
    </p>
  </div>
    <p className='comment-body'>
      {comment.body}
    </p>
    <p className='comment-email'>
      {'E-mail - '}
      {comment.email}
    </p>
  </div>
);

const mapDispatchToProps = dispatch => ({
  removeComment: id => dispatch(handleRemoveComment(id))
});

Comment.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    body: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
  }).isRequired,
};

export default connect(
  null, mapDispatchToProps
)(Comment);
