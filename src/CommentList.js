import React from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';

const CommentList = ({ postId, comments }) => (
  <div className="comment-list">
    <h3>Comments</h3>
    <hr />
    {comments.map(
      commentData => (
        <Comment
          comment={commentData}
          key={commentData.id}
          postId={postId}
        />
      )
    )}
  </div>
);

CommentList.propTypes = {
  postId: PropTypes.number.isRequired,
  comments: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    email: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
  })).isRequired,
};

export default CommentList;
