import React from 'react';
import PropTypes from 'prop-types';
import CurrComment from './Comment';

const CommentList = ({ comments, postId }) => (
  comments.map(currentComment => (
    <CurrComment
      comment={currentComment}
      postId={postId}
    />
  ))
);

CommentList.propTypes
  = { comments: PropTypes.arrayOf(PropTypes.object).isRequired };

export default CommentList;
