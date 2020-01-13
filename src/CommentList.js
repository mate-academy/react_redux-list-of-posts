import React from 'react';
import PropTypes from 'prop-types';
/*eslint-disable */
import Comment from './Comment';
/* eslint-enable */

const CommentList = ({ comments }) => (
  <div className="comments-list">

    {comments.map(comment => (
      <Comment comment={comment} key={comment.id} />
    ))}
  </div>
);

CommentList.propTypes
  = { comments: PropTypes.arrayOf(PropTypes.object) };
CommentList.defaultProps = { comments: [{}] };

export default CommentList;
