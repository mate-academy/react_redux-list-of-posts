import React from 'react';
import './Comment.css';
import PropTypes from 'prop-types';
import Userincomment from '../Userincomments/Userincomments';

const CommentItem = ({ id, comment, removeComment }) => {
  const { body, email } = comment;

  return (
    <div className="comment-item">
      <li className="comment-text">{body}</li>
      <Userincomment user={email} />
      <button
        className="btn-remove"
        type="button"
        onClick={() => removeComment(id)}
      >
        {'\u2716'}
      </button>
    </div>
  );
};

CommentItem.propTypes = {
  id: PropTypes.number,
  comment: PropTypes.shape({
    body: PropTypes.string,
    email: PropTypes.string,
  }),
}.isRequaired;

export default CommentItem;
