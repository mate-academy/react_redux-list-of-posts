import React from 'react';
import PropTypes from 'prop-types';
import CommentItem from './Comment';

const CommentList = ({ comments }) => (
  <div className="comments">
    Comments:
    {comments.map(
      comment => <CommentItem key={comment.id} comment={comment} />
    )}
  </div>
);

CommentList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired,
};

export default CommentList;
