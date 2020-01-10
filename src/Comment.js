import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deleteComment } from './reducers/postsReducer';

// eslint-disable-next-line no-shadow
const Comment = ({ commentData, deleteComment }) => (
  <>
    <dt>
      <button
        type="button"
        className="delete delete-comment"
        onClick={() => deleteComment(commentData.postId, commentData.id)}
      >
        X
      </button>
      {commentData.name}
      <br />
      {commentData.email}
    </dt>
    <dd>{commentData.body}</dd>
  </>
);

Comment.propTypes = {
  commentData: PropTypes.shape({
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired,
    postId: PropTypes.number.isRequired,
  }).isRequired,
  deleteComment: PropTypes.func.isRequired,
};

export default connect(null, { deleteComment })(Comment);
