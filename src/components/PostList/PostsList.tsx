import React, {FC} from 'react';
import { PostItem } from '../PostItem/PostItem';

import './PostList.css';

interface PostListProps {
  filterPosts: PostsWithUser[];
}

export const PostList: FC<PostListProps> = ({ filterPosts }) => {
  return (
    <div className="post-list">
      {
        filterPosts.map(post => (
          <PostItem key={post.id} post={post} />
        ))
      }
    </div>
  );
};
