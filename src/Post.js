import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { deletePostAC } from './store';
import User from './User';
import CommentList from './CommentList';

const Post = ({ post, deletePost }) => (
  <div className="post">
    <button
      className="button--delete"
      type="button"
      onClick={() => deletePost(post.id)}
    >
      Remove post
    </button>
    <h3 className="post--header">
      {post.title}
    </h3>
    <User user={post.user} />
    <p className="post--body">{post.body}</p>
    <CommentList comments={post.comments} />
  </div>
);

Post.propTypes = {
  post: PropTypes.shape({
    user: PropTypes.object,
    title: PropTypes.string,
    body: PropTypes.string,
    id: PropTypes.number,
    comments: PropTypes.array,
  }).isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapDispatchToProps = {
  deletePost: deletePostAC,
};

export default connect(null, mapDispatchToProps)(Post);
