import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import User from './User';
import CommentsList from './CommentsList';
import * as actionCreators from './store';

const Post = ({ post, deletePost }) => (
  <div className="post">
    <button
      type="button"
      className="post__button"
      onClick={() => deletePost(post.id)}
    >
      X
    </button>
    <p className="post__title">{post.title}</p>
    <p className="post__body">{post.body}</p>
    <User user={post.user} />
    <CommentsList comments={post.comments} />
  </div>
);

const mapDispatchToProps = {
  deletePost: actionCreators.deletePost,
};

export default connect(null, mapDispatchToProps)(Post);

Post.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
    comments: PropTypes.object,
    user: PropTypes.object,
    id: PropTypes.number,
  }).isRequired,
  deletePost: PropTypes.func.isRequired,
};
