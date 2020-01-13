import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { handleDeleteComment } from '../store';

// eslint-disable-next-line no-shadow
const CommentItem = ({ postId, comment, handleDeleteComment }) => {
  const { id, name, body, email } = comment;

  return (
    <div className="comment">
      <h3 className="comment-name">{name}</h3>
      <p className="comment-body">{body}</p>
      <p className="comment-email">
        <span>By </span>
        {email}
      </p>
      <button
        onClick={() => handleDeleteComment(postId, id)}
        className="delete-comment"
        type="button"
      >
        Delete comment
      </button>
      <hr />
    </div>
  );
};

const mapStateToProps = state => ({
  data: state.data,
});

CommentItem.propTypes
  = {
    postId: PropTypes.number.isRequired,
    comment: PropTypes.oneOfType([PropTypes.object]).isRequired,
    handleDeleteComment: PropTypes.func.isRequired,
  };

export default connect(mapStateToProps, { handleDeleteComment })(CommentItem);
