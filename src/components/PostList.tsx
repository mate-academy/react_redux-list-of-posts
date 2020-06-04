import React from 'react';
import { useSelector } from 'react-redux';
import './PostList.scss';

import PostCard from './PostCard';

import {
  getVisiblePosts,
} from '../store';

const PostList = () => {
  const posts = useSelector(getVisiblePosts);

  return (
    <ul className="post__list">
      {posts.map(post => (
        <li className="post__item" key={post.id}>
          <PostCard post={post} />
        </li>
      ))}
    </ul>
  )
};

export default PostList;
