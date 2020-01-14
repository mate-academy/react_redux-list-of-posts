import React from 'react';
import PropTypes from 'prop-types';
import Comment from './Comment';

const CommentsList = ({ comments }) => (
  <>
    {comments.length > 0 ? (
      <>
        <h2 className="comment__title">
          Comments:
        </h2>
        <ol type="1">
          {comments.map(item => (
            <Comment
              comment={item}
            />
          ))}
        </ol>
      </>
    ) : (
      <h3>No comments for this post</h3>
    )
    }
  </>
);

CommentsList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default CommentsList;
