import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import CommentList from './CommentList';
import User from './User';
import * as postFunctions from '../reducers/PostsReducer';

const Post = ({ post, deletePost }) => (
  <div className="post">
    <button
      type="button"
      onClick={() => deletePost(post.id)}
      className="delete"
    >
      delete post
    </button>
    <p className="title">{post.title}</p>
    <p>{post.body}</p>
    <div className="user">
      <User user={post.user} />
    </div>
    <ul>
      <p className="title-comment">Comments</p>
      <CommentList comments={post.comments} postId={post.id} />
    </ul>
  </div>
);

const getExtraMethods = dispatch => ({
  deletePost: value => dispatch(
    postFunctions.deletePost(value)
  ),
});

Post.propTypes = {
  post: PropTypes.oneOfType([PropTypes.string,
    PropTypes.number,
  ])
    .isRequired,
};

Post.propTypes = { deletePost: PropTypes.func.isRequired };

export default connect(null, getExtraMethods)(Post);
