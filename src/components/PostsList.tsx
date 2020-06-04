import React, { useMemo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import Post from './Post';
import { RootState } from '../store';

const PostsList: React.FunctionComponent = () => {
  const posts = useSelector((state: RootState) => state.posts);
  const searchQuery = useSelector((state: RootState) => state.query);

  const getSortedPosts = useCallback(() => {
    const normalizedQuery: string = searchQuery.toLowerCase();

    return posts
      .filter((post: Post) => (post.body + post.title)
        .toLowerCase()
        .includes(normalizedQuery));
  }, [posts, searchQuery]);

  const visiblePosts = useMemo(() => getSortedPosts(), [getSortedPosts]);

  return (
    <div className="container">
      {visiblePosts.map((postItem: Post) => <Post post={postItem} key={postItem.id} />)}
    </div>
  );
};

export default PostsList;
