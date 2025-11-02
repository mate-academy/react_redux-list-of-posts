import React from 'react';
import { PostsList } from '../components/PostsList';
import { useAppDispatch, useAppSelector } from '../app/store';
import { selectPost } from '../slices/selectedPostSlice';
import { Post } from '../types/Post';

export const PostsListContainer: React.FC = () => {
  const dispatch = useAppDispatch();
  const author = useAppSelector(state => state.author.author);
  const postsState = useAppSelector(state => state.posts);
  const selectedPostId = useAppSelector(state => state.selectedPost.postId);

  const handlePostSelected = (post: Post | null) => {
    dispatch(selectPost(post));
  };

  if (!author) {
    return null;
  }

  return (
    <>
      {!postsState.loaded && !postsState.hasError && (
        <div>Loading posts...</div>
      )}

      {postsState.loaded && postsState.hasError && (
        <div>Failed to load posts</div>
      )}

      {postsState.loaded && !postsState.hasError && (
        <PostsList
          posts={postsState.items}
          selectedPostId={selectedPostId ?? undefined}
          onPostSelected={handlePostSelected}
        />
      )}
    </>
  );
};
