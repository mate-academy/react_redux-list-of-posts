/* eslint-disable react/prop-types */
import React from 'react';
import PropTypes from 'prop-types';
import User from '../User/User';
import CommentList from '../CommentList/CommentList';
import './Post.css';

const Post = (props) => {
  const {
    post,
    deletePostFromPostList,
  } = props;
  const {
    title, body, user, comments,
  } = post;

  return (
    <div className="post">
      <h2>{title}</h2>
      <p>{body}</p>
      <button
        onClick={() => { deletePostFromPostList(post.id); }}
        type="button"
        className="button-delete-item"
      >
        delete post
      </button>
      <hr />
      <User user={user} />
      <CommentList comments={comments} />
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string,
    body: PropTypes.string,
  }).isRequired,
};

export default Post;
