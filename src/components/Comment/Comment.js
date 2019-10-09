import React from 'react';
import './Comment.css';
import User from '../User/User';
import { CommentPropTypes } from '../../constants/prototypes';

const Comment = ({ comment, deleteComment }) => {
  const { name, email, body } = comment;

  return (
    <div className="comment">
      <User name={name} email={email} />
      <p className="comment-text">
        {body}
      </p>
      <button
        type="button"
        className="btn-delete-comment"
        onClick={deleteComment}
      >
        x
      </button>
    </div>
  );
};

Comment.propTypes = CommentPropTypes;

export default Comment;
