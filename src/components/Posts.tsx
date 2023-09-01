import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { User } from '../types/User';
import * as postsActions from '../features/posts';
import { Loader } from './Loader';
import { PostsList } from './PostsList';

export const Posts: React.FC = () => {
  const dispatch = useAppDispatch();

  const { posts, hasError, loaded } = useAppSelector(state => state.posts);
  const author = useAppSelector<User | null>(state => state.author.author);

  const showError = author && loaded && hasError;
  const noPosts = author && loaded && !hasError && !posts.length;
  const showPostsList = author && loaded && !hasError && !!posts.length;

  useEffect(() => {
    dispatch(postsActions.setSelectedPost(null));

    if (author?.id) {
      dispatch(postsActions.initPosts(author.id));
    }
  }, [author?.id]);

  return (
    <div className="block" data-cy="MainContent">
      {!author && (
        <p data-cy="NoSelectedUser">
          No user selected
        </p>
      )}

      {author && !loaded && (
        <Loader />
      )}

      {showError && (
        <div
          className="notification is-danger"
          data-cy="PostsLoadingError"
        >
          Something went wrong!
        </div>
      )}

      {noPosts && (
        <div className="notification is-warning" data-cy="NoPostsYet">
          No posts yet
        </div>
      )}

      {showPostsList && (
        <PostsList />
      )}
    </div>
  );
};
