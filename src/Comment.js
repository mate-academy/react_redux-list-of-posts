import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import * as post from './store/post';

const Comment = ({ comment, posts, setPost }) => {
  const removeComment = () => {
    setPost(posts.map(post => {
      if (comment.postId === post.id) {
        post.comments = post.comments.filter(newComments => {
          return newComments.id !== comment.id;
        });
      }
      return post;
    }));
  }
  return (
  <div>
    <h3 className="headers">
      {comment.name}
    </h3>
    <p>
      {comment.email}
    </p>
    <p>
      {comment.body}
    </p>
    <button type="button" onClick={removeComment}>
      Remove
    </button>
  </div>
)};

const getPosts = (state) => ({
  posts: state.posts,
});

const removePost = {
  setPost: post.setPosts,
}

Comment.propTypes = {
  comment: PropTypes.objectOf(PropTypes.any).isRequired,
  posts: PropTypes.arrayOf(PropTypes.any).isRequired,
  setPost: PropTypes.func.isRequired,
};

export default connect(getPosts, removePost)(Comment);
