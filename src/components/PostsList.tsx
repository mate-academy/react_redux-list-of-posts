import React from 'react';
import { Post } from '../types/Post';

interface PostsListProps {
  posts: Post[];
  selectedPostId: number | null; // Ensure this matches the expected type
  onPostSelected: (post: Post | null) => void;
}

const PostsList: React.FC<PostsListProps> = ({
  posts,
  selectedPostId,
  onPostSelected,
}) => {
  return (
    <ul>
      {posts.map(post => (
        <li
          key={post.id}
          onClick={() => onPostSelected(post)}
          style={{
            fontWeight: selectedPostId === post.id ? 'bold' : 'normal',
          }}
        >
          {post.title}
        </li>
      ))}
    </ul>
  );
};

export default PostsList;
