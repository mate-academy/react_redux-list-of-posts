import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { deleteComment } from '../reducers/postsReducer';

const CommentItem = ({ postId, comment, deleteComment }) => {
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
        onClick={() => deleteComment(postId, id)}
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
    deleteComment: PropTypes.func.isRequired,
  };

export default connect(mapStateToProps, { deleteComment })(CommentItem);
