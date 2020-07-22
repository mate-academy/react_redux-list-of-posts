/* eslint-disable no-console */
import React from 'react';
import { useSelector } from 'react-redux';

import { getPosts, getFilterOption } from '../store';
import { PostItem } from './PostItem';

export const PostsList = () => {
  const posts = useSelector(getPosts);
  const option = useSelector(getFilterOption);
  const visiblePosts = posts.filter(item => (item.title + item.body).includes(option));

  return (
    <ul className="posts">
      {
        visiblePosts.map(post => <PostItem key={post.id} post={post} />)
      }
    </ul>
  );
};
