import React from 'react';
import User from '../User/User';
import { CommentList } from '../CommentList';
import { PostProps } from '../PropTypes/PropTypes';

import './Post.css';

const Post = ({
  title, text, user, id, deletePost,
}) => (
  <div className="post">
    <button
      type="button"
      onClick={deletePost}
      className="destroy"
    />
    <User
      name={user.name}
      email={user.email}
      address={user.address}
    />
    <h1 className="post__title">
      {title}
    </h1>
    <p className="post__text">
      {text}
    </p>
    <CommentList id={id} />
  </div>
);

Post.propTypes = PostProps;

export default Post;
