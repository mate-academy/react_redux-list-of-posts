import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Loader } from './Loader';
import { PostsList } from './PostsList';
import * as postsActions from '../features/posts/postsSlice';
import { Post } from '../types/Post';

export const UserPosts = () => {
  const { selectedUser } = useAppSelector(state => state.users);
  const { posts, selectedPost, loading, error } = useAppSelector(
    state => state.posts,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selectedUser !== null) {
      dispatch(postsActions.init(selectedUser.id));
    }
  }, [selectedUser, dispatch]);

  const selectPost = (post: Post | null) => {
    dispatch(postsActions.addSelectedPost(post));
  };

  return (
    <>
      {!selectedUser && <p data-cy="NoSelectedUser">No user selected</p>}

      {selectedUser && loading && <Loader />}

      {selectedUser && !loading && error && (
        <div className="notification is-danger" data-cy="PostsLoadingError">
          {error}
        </div>
      )}

      {selectedUser && !loading && !error && posts.length === 0 && (
        <div className="notification is-warning" data-cy="NoPostsYet">
          No posts yet
        </div>
      )}

      {selectedUser && !loading && !error && posts.length > 0 && (
        <PostsList
          posts={posts}
          selectedPostId={selectedPost?.id}
          onPostSelected={selectPost}
        />
      )}
    </>
  );
};
