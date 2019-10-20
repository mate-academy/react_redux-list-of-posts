/* eslint-disable react/destructuring-assignment */
/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
import React from 'react';
import './Comment.css';
import PropTypes from 'prop-types';

const Comment = (props) => {
  const {
    name, email, body, id,
  } = props.comment;
  return (
    <div className="comment">
      <button
        type="button"
        className="remove remove-comment"
        onClick={id => props.handleRemoveComment(id)}
      >
          ✕
      </button>
      <div className="comment__name">
        { name.charAt(0).toUpperCase() + name.slice(1) }
      </div>
      <div className="comment__body">
        { body.charAt(0).toUpperCase() + body.slice(1) }
      </div>
      <div className="comment__email">
        { email.charAt(0).toUpperCase() + email.slice(1) }
      </div>
    </div>
  );
};

export default Comment;

Comment.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  }).isRequired,
  handleRemoveComment: PropTypes.func.isRequired,
};
