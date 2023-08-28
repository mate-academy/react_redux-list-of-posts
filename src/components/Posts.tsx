import { useEffect } from 'react';
import * as postsActions from '../features/posts';
import { PostsList } from './PostsList';
import { Loader } from './Loader';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { User } from '../types/User';

export const Posts: React.FC = () => {
  const dispatch = useAppDispatch();

  const { posts, hasError, loaded } = useAppSelector(state => state.posts);
  const author = useAppSelector<User | null>(state => state.author.author);

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

      {author && loaded && hasError && (
        <div
          className="notification is-danger"
          data-cy="PostsLoadingError"
        >
          Something went wrong!
        </div>
      )}

      {author && loaded && !hasError && posts.length === 0 && (
        <div className="notification is-warning" data-cy="NoPostsYet">
          No posts yet
        </div>
      )}

      {author && loaded && !hasError && posts.length > 0 && (
        <PostsList />
      )}
    </div>
  );
};
