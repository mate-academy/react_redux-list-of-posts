import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line no-shadow
import Comment from './Comment';

const CommentList = ({ comments, postId }) => comments.length > 0 && (
  <div className="post__comments comments">
    <h2 className="comments__title">Comments:</h2>
    {comments.map(comment => (
      <Comment key={comment.id} comment={comment} postId={postId} />
    ))}
  </div>
);

export default CommentList;

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
};
