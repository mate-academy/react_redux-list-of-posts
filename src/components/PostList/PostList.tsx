import React from 'react';
import { PostCard } from '../PostCard/PostCard';

type Props = {
  posts: PreparedPost[];
};

export const PostList: React.FC<Props> = ({ posts }) => (
  <ul>
    {posts.map((post: PreparedPost) => (
      <PostCard {...post} key={post.id} />
    ))}
  </ul>
);
