import React from 'react';
import { Post } from '../types/Post';

interface PostDetailsProps {
  post: Post;
}

export const PostDetails: React.FC<PostDetailsProps> = ({ post }) => {
  return (
    <div>
      <h2>{post.title}</h2>
      <p>{post.body}</p>
    </div>
  );
};
