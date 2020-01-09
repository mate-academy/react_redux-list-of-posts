import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import User from './User';
import CommentList from './CommentList';
import { deletePost } from './store/posts';

// eslint-disable-next-line no-shadow
const Post = ({ post, deletePost }) => (
  <article className="post__item">
    <button
      type="button"
      className="post__delete"
      onClick={() => deletePost(post.id)}
    >
      Delete post
    </button>
    <h2 className="post__title">{post.title}</h2>
    <p className="post__text">{post.body}</p>
    <User user={post.user} />
    <CommentList comments={post.comments} postId={post.id} />
  </article>
);

export default connect(null, { deletePost })(Post);

Post.propTypes = {
  post: PropTypes.objectOf(PropTypes.any).isRequired,
  deletePost: PropTypes.func.isRequired,
};
