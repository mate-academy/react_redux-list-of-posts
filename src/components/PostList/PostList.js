import React from 'react';
import './PostList.css';

import { store } from '../../store';
import { Post } from '../Post/Post';

export const PostList = () => (
  <div className="post-list">
    {store.getState().posts.map(post => (
      <Post data={post} key={post.id} />))
    }
  </div>
);
