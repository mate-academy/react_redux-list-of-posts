import React from 'react';
import './PostList.css';

import { Post } from '../Post/Post';

export const PostList = ({ posts }) => (
  <div className="post-list">
    {posts.map(post => (
      <Post data={post} key={post.id} />))
    }
  </div>
);
