import React from 'react';
import PropTypes from 'prop-types';
import User from '../User/User';

const CommentItem = ({ comment }) => {
  const { body } = comment;

  return (
    <>
      <User user={comment} />
      <p>{body}</p>
      <button
        type="button"
        className="button-delete-item"
      >
        delete comment
      </button>
    </>
  );
};

CommentItem.propTypes = {
  comment: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    body: PropTypes.string,
  }).isRequired,
};

export default CommentItem;
