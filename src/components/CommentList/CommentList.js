import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line no-shadow
import Comment from '../Comment';
import './CommentList.css';

const CommentList = ({ comments }) => (
  <div className="comment-list">
    { comments.map(comment => (
      <Comment key={comment.id} comment={comment} />
    ))
    }
  </div>
);

export default CommentList;

CommentList.propTypes = {
  comments: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
    }).isRequired,
  ).isRequired,
};
