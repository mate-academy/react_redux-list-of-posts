import React from 'react';
import PropTypes from 'prop-types';
import UsersComment from './UsersComment';

const Comments = ({ comments }) => (
  <section className="post__comments">
    <h2 className="post__comments--title title">Comments:</h2>
    {comments.map(comment => (
      <UsersComment commentProps={comment} key={comment.id} />
    ))}
    {
      comments.length === 0 && (
        <h3 className="post__comments--no-comment">
          No comments yet
        </h3>
      )
    }
  </section>
);

Comments.propTypes = { comments: PropTypes.arrayOf(PropTypes.object) };
Comments.defaultProps = { comments: [] };
export default Comments;
