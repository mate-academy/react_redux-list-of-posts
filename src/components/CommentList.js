import React from 'react';
import PropTypes from 'prop-types';
import Comments from './Comment';

const CommentList = ({ comments }) => (
  <table>
    {comments.map(comment => (
      <Comments
        comment={comment}
        key={comment.id}
      />
    ))}
  </table>
);

CommentList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CommentList;
