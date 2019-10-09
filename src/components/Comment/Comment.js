import React from 'react';

import PropTypes from 'prop-types';
import './Comment.css';

const Comment = ({ comment, deleteComment }) => {
  const {
    name, email, body,
  } = comment;

  return (
    <div className="comment">
      <h5>{`${name[0].toUpperCase()}${name.slice(1)}`}</h5>
      <p>{body}</p>
      <p className="comment_email">{email}</p>
      <button
        className="button button--delete"
        onClick={() => deleteComment(comment.id)}
        type="button"
      >
        delete comment
      </button>
      <hr className="comment__bottom-line" />
    </div>
  );
};

const shape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
});

Comment.propTypes = {
  comment: shape.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

export default Comment;
