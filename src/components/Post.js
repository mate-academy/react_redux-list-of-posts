import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deletePost } from '../reducers/postsReducer';
import User from './User';
import CommentList from './CommentList';

const Post = ({ post, deletePost }) => {
  const { title, body, user, id, comments } = post;

  return (
    <div className="posts">
      <div className="flip-container">
        <button
          className="delete-post"
          onClick={() => deletePost(id)}
          type="button"
        >
          Delete
        </button>
        <div className="flipper">
          <div className="front">
            <h2 className="front-heading">{title}</h2>
            <p className="front-body">{ `"${body}"`}</p>
            <User user={user} />
          </div>
          <div className="back">
            <p className="back-heading">Comments:</p>
            <CommentList comments={comments} postId={id} />
          </div>
        </div>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  data: state.data,
});

Post.propTypes = {
  post: PropTypes.shape({
    id: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    body: PropTypes.string.isRequired,
    user: PropTypes.shape({}).isRequired,
    deletePost: PropTypes.func.isRequired,
    comments: PropTypes.arrayOf(PropTypes.object.isRequired).isRequired,
  }).isRequired,
};

export default connect(mapStateToProps, { deletePost })(Post);
