import React from 'react';

import PropTypes from 'prop-types';

import './Comment.css';

function Comment({ comment, deleteComment }) {
  const { name, email, body } = comment;

  return (
    <div>
      <div className="comment__comm">{body}</div>
      <div className="border">
        <p className="comment__text-comm">{name}</p>
        <p className="comment__text-comm">
          {email}
        </p>
      </div>

      <button
        type="button"
        onClick={() => deleteComment(comment.id, comment.postId)}
      >
        Remove comment
      </button>
    </div>
  );
}

Comment.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  comment: PropTypes.shape({
    body: PropTypes.string,
    name: PropTypes.string,
    email: PropTypes.string,
    id: PropTypes.number,
    postId: PropTypes.number,
  }).isRequired,
};

export default Comment;
