import { useAppSelector } from '../app/hooks';
import { selectAuthor } from '../features/authorSlice';
import { selectPosts } from '../features/postsSlice';

import { Loader } from './Loader';
import { PostsList } from './PostsList';

export const MainContent = () => {
  const { items: posts, isLoading, hasError } = useAppSelector(selectPosts);
  const author = useAppSelector(selectAuthor);

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
