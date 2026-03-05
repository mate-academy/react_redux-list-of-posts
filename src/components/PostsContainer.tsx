//#region imports
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Loader } from './Loader';
import { loadUserPosts, set as setPosts } from '../features/posts';
import { PostsList } from './PostsList';
import { Post } from '../types/Post';
import { select, deselect } from '../features/selectedPost';
// #endregion

export const PostsContainer = () => {
  const dispatch = useAppDispatch();

  const author = useAppSelector(state => state.author);
  const selectedPost = useAppSelector(state => state.selectedPost);
  const {
    items: posts,
    hasError,
    loaded,
  } = useAppSelector(state => state.posts);

  useEffect(() => {
    dispatch(deselect());

    if (author) {
      dispatch(loadUserPosts(author.id));
    } else {
      dispatch(setPosts([]));
    }
  }, [author?.id, dispatch]);

  const onPostSelected = (post: Post) => {
    if (selectedPost?.id === post.id) {
      dispatch(deselect());
    } else {
      dispatch(select(post));
    }
  };

  return (
    <div className="block" data-cy="MainContent">
      {!author && <p data-cy="NoSelectedUser">No user selected</p>}

      {author && !loaded && <Loader />}

      {author && loaded && hasError && (
        <div className="notification is-danger" data-cy="PostsLoadingError">
          Something went wrong!
        </div>
      )}

      {author && loaded && !hasError && posts.length === 0 && (
        <div className="notification is-warning" data-cy="NoPostsYet">
          No posts yet
        </div>
      )}

      {author && loaded && !hasError && posts.length > 0 && (
        <PostsList
          posts={posts}
          selectedPostId={selectedPost?.id}
          onPostSelected={onPostSelected}
        />
      )}
    </div>
  );
};
