import { useAppSelector } from '../app/hooks';

import { Loader } from './Loader';
import { PostsList } from './PostsList';

export const MainContent = () => {
  const {
    items: posts,
    isLoading,
    hasError,
  } = useAppSelector(state => state.posts);
  const author = useAppSelector(state => state.author);

  if (!author) {
    return <p data-cy="NoSelectedUser">No user selected</p>;
  }

  if (isLoading) {
    return <Loader />;
  }

  if (hasError) {
    return (
      <div className="notification is-danger" data-cy="PostsLoadingError">
        Something went wrong!
      </div>
    );
  }

  return (
    <>
      {!posts.length ? (
        <div className="notification is-warning" data-cy="NoPostsYet">
          No posts yet
        </div>
      ) : (
        <PostsList />
      )}
    </>
  );
};
