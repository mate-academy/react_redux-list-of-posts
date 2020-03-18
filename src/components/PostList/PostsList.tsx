import React, {FC} from 'react';
import { PostItem } from '../PostItem/PostItem';

interface PostListProps {
  filteredPosts: PostsWithUser[];
}

export const PostList: FC<PostListProps> = ({ filteredPosts }) => {
  return (
    <div className="post-list">
      {
        filteredPosts.map(post => (
          <PostItem key={post.id} post={post} />
        ))
      }
    </div>
  );
};
