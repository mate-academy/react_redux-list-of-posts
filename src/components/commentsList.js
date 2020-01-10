import React from 'react';
import PropTypes from 'prop-types';
import SingleComment from './comment';

const CommentsList = ({ comments }) => (
  <article>
    <h3>Comments:</h3>
    {comments.map(comment => (
      <SingleComment
        key={comment.id}
        id={comment.id}
        title={comment.name}
        body={comment.body}
        email={comment.email}
      />
    ))}
  </article>
);

CommentsList.propTypes = {
  comments: PropTypes.arrayOf(PropTypes.shape({
    body: PropTypes.string,
    email: PropTypes.string,
    id: PropTypes.number,
    name: PropTypes.string,
    postId: PropTypes.number,
  })).isRequired,
};

export default CommentsList;
