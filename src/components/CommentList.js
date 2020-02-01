import React from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';

const CommentList = ({ comments, deleteComment }) => (
  <table>
    {comments.map(comment => (
      <Comment
        comment={comment}
        key={comment.id}
        deleteComment={deleteComment}
      />
    ))}
  </table>
);

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
  deleteComment: PropTypes.func.isRequired,
};

export default CommentList;
