import React from 'react';
import './Post.css';
import User from '../User/User';
import CommentList from '../CommentList/CommentList';
import { PostPropTypes } from '../../constants/prototypes';

const Post = ({ post, deletePost }) => {
  const { user, comments } = post;

  return (
    <div className="post">
      <h2 className="post-title">{post.title}</h2>
      <p className="post-text">{post.body}</p>
      <User name={user.name} email={user.email} address={user.address} />
      <CommentList comments={comments} />
      <button
        type="button"
        className="btn-delete-post"
        onClick={deletePost}
      >
        x
      </button>
    </div>
  );
};

Post.propTypes = PostPropTypes;

export default Post;
