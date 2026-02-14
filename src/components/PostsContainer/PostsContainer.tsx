import { useAppSelector } from '../../app/hooks';
import { Post } from '../../types/Post';
import { Loader } from '../Loader';
import { PostsList } from '../PostsList';

interface PostsContainerProps {
  loaded: boolean;
  hasError: boolean;
  items: Post[];
}

export const PostsContainer: React.FC<PostsContainerProps> = ({
  loaded,
  hasError,
  items,
}) => {
  const { chosenUser } = useAppSelector(state => state.users);

  return (
    <div className="block" data-cy="MainContent">
      {!chosenUser && <p data-cy="NoSelectedUser">No user selected</p>}
      {chosenUser && loaded && <Loader />}

      {chosenUser && !loaded && hasError && (
        <div className="notification is-danger" data-cy="PostsLoadingError">
          Something went wrong!
        </div>
      )}

      {chosenUser && !loaded && !hasError && items.length === 0 && (
        <div className="notification is-warning" data-cy="NoPostsYet">
          No posts yet
        </div>
      )}

      {chosenUser && !loaded && !hasError && items.length > 0 && (
        <PostsList posts={items} />
      )}
    </div>
  );
};
