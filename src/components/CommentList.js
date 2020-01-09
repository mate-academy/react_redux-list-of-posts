import React from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';

const CommentList = ({ postId, comments }) => comments.map(comment => (
  <Comment key={comment.id} comment={comment} postId={postId} />
));

CommentList.propTypes = {
  postId: PropTypes.number.isRequired,
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CommentList;
