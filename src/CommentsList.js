import React from 'react';
import PropTypes from 'prop-types';
// eslint-disable-next-line no-shadow
import Comment from './Comment';

const CommentsList = ({ comments }) => (
  <div className="post__comments comments">
    <p>Comments:</p>
    <ul className="comments__list">
      {comments.map(singleComment => <Comment comment={singleComment} />)}
    </ul>
  </div>
);

export default CommentsList;

// eslint-disable-next-line max-len
CommentsList.propTypes = { comments: PropTypes.arrayOf(PropTypes.object).isRequired };
