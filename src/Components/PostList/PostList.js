import React from 'react';
import { Post } from '../Post';
import { PostListProps } from '../PropTypes/PropTypes';

import './PostList.css';

const PostList = ({ posts }) => (
  <div className="post-list">
    {posts.map(({
      title, body, user, id,
    }) => (
      <Post
        title={title}
        text={body}
        user={user}
        id={id}
        key={id}
      />
    ))}
  </div>
);

PostList.propTypes = PostListProps;

export default PostList;
