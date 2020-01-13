import PropTypes from 'prop-types';
import React from 'react';
import CommentItem from './CommentItem';

const CommentList = ({ postId, comments }) => (
  <div>
    {comments.map(currentComment => (
      <CommentItem
        comment={currentComment}
        postId={postId}
        key={currentComment.id}
      />
    ))}
  </div>
);

CommentList.propTypes
  = {
    postId: PropTypes.number.isRequired,
    comments: PropTypes.oneOfType([PropTypes.array]).isRequired,
  };

export default CommentList;
