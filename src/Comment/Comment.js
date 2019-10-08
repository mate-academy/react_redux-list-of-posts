import React from 'react';
import PropTypes from 'prop-types';
import User from '../User/User';
import './Comment.css';

const Comment = ({ comment, deleteComment }) => {
  const { body, email, name } = comment;

  return (
    <div className="comment">
      <p>
        {body}
      </p>
      <User name={name} email={email} />
      <button type="button" onClick={() => deleteComment(comment.id)}>Delete comment</button>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.shape({
    body: PropTypes.string,
    email: PropTypes.string,
    name: PropTypes.string,
    id: PropTypes.number,
  }).isRequired,
  deleteComment: PropTypes.func.isRequired,
};

export default Comment;
