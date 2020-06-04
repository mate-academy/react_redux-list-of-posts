import React from 'react';
import { useSelector } from 'react-redux';
import { PostCard } from './PostCard';
import { getVisiblePosts } from '../store';

export const PostLists = () => {
  const posts = useSelector(getVisiblePosts);

  return (
    <div>
      {posts.map((post: Post) => (
        <PostCard key={post.id} {...post} />
      ))}
    </div>
  );
};
