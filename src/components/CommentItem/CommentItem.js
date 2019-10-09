import React from 'react';
import PropTypes from 'prop-types';
import User from '../User/User';

const CommentItem = ({ comment, deleteCommentFromPost }) => {
  const { body } = comment;

  return (
    <>
      <User user={comment} />
      <p>{body}</p>
      <button
        onClick={() => { deleteCommentFromPost(comment.postId, comment.id); }}
        type="button"
        className="button-delete-item"
      >
        delete comment
      </button>
    </>
  );
};

CommentItem.propTypes = {
  deleteCommentFromPost: PropTypes.func.isRequired,
  comment: PropTypes.shape({
    postId: PropTypes.number.isRequired,
    id: PropTypes.number.isRequired,
    name: PropTypes.string,
    email: PropTypes.string,
    body: PropTypes.string,
  }).isRequired,
};

export default CommentItem;
