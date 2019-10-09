import React from 'react';
import PropTypes from 'prop-types';
import User from '../User/User';
import CommentList from '../CommentList/CommentList';
import './Post.css';

const Post = ({ post, deletePost }) => (
  <div className="post">
    <h1 className="post__header">
      Post #&nbsp;
      {post.id}
    </h1>
    <h2 className="post__title">{post.title}</h2>
    <p className="post__body">{post.body}</p>
    <User user={post.user} />
    <button
      onClick={() => deletePost(post.id)}
      type="button"
      className="button button--delete"
    >
      delete Post
    </button>
    <br />
    <div className="post__footer">Comments:</div>
    <CommentList comments={post.comments} />
  </div>
);

const shape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
});

Post.propTypes = {
  post: shape.isRequired,
  deletePost: PropTypes.func.isRequired,
};

export default Post;
