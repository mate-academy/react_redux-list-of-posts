import React from 'react';
import PropTypes from 'prop-types';
import Comments from './Comments';

const CommentsList = ({ comments }) => (
  <>
    <h2 className="comment__title">
  Comments:
    </h2>
    <ol type="1">
      {comments.map(comment => (
        <Comments
          comment={comment}
        />
      ))}
    </ol>
  </>
);

CommentsList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CommentsList;
