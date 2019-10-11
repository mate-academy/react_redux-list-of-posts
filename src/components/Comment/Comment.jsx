import React from 'react';
import './Comment.scss';

function Comment({ comment, deleteCommentFromPost }) {
  const { name, email, body } = comment;

  return (
    <div
      className="
        d-flex flex-column
        border-3 border-success
        rounded
        p-3 m-3"
    >
      <button
        className="btn btn-danger align-self-end mb-3"
        type="button"
        onClick={deleteCommentFromPost}
      >
X
      </button>
      <h4>{name}</h4>
      <p>{email}</p>
      <p>{body}</p>
    </div>
  );
}

export default Comment;
