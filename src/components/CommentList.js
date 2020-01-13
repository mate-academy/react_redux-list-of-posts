import PropTypes from 'prop-types';
import React from 'react';
import CommentItem from './CommentItem';

const CommentList = ({ comments }) => (
  <div>
    {comments.map(currentComment => (
      <CommentItem comment={currentComment} key={currentComment.id} />))}
  </div>
);

CommentList.propTypes
  = { comments: PropTypes.oneOfType([PropTypes.array]).isRequired };

export default CommentList;
