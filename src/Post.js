import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import User from './User';
import CommentsList from './CommentsList';
import { deletePost } from './reducers/postsReducer';

// eslint-disable-next-line no-shadow
const Post = ({ data: { title, body, user, comments, id }, deletePost }) => (
  <>
    <h2>{title}</h2>
    <button
      type="button"
      className="delete delete-post"
      onClick={() => deletePost(id)}
    >
      X
    </button>
    <p>{body}</p>
    <p className="author">
      <User userData={user} />
    </p>
    {comments.length
      ? (
        <>
          <h3>Comments:</h3>
          <CommentsList commentsData={comments} />
        </>
      )
      : ''
    }

  </>
);

Post.propTypes = {
  data: PropTypes.oneOfType([PropTypes.object]).isRequired,
  deletePost: PropTypes.func.isRequired,
};

export default connect(null, { deletePost })(Post);
