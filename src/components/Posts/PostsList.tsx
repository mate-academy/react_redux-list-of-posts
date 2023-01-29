import { FC, useEffect, useState } from 'react';
import { PostItem } from './PostItem';
import { Loader } from '../Loader';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { getPostsByUserId } from '../../app/slices/postSlice';

export const PostsList: FC = () => {
  const { selectedUser } = useAppSelector(state => state.user);
  const { posts, status } = useAppSelector(state => state.post);
  const [isUser, setIsUser] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selectedUser === null) {
      setIsUser(false);
    } else {
      setIsUser(true);
      dispatch(getPostsByUserId(selectedUser.id));
    }
  }, []);

  if (!isUser) {
    return <p data-cy="NoSelectedUser">No user selected</p>;
  }

  if (status === 'loading') {
    return <Loader />;
  }

  if (status === 'failed') {
    return (
      <div
        className="notification is-danger"
        data-cy="PostsLoadingError"
      >
        Something went wrong!
      </div>
    );
  }

  if (posts.length === 0) {
    return (
      <div
        className="notification is-warning"
        data-cy="NoPostsYet"
      >
        No posts yet
      </div>
    );
  }

  return (
    <div data-cy="PostsList">
      <p className="title">Posts:</p>

      <table className="table is-fullwidth is-striped is-hoverable is-narrow">
        <thead>
          <tr className="has-background-link-light">
            <th>#</th>
            <th>Title</th>
            {/* eslint-disable-next-line jsx-a11y/control-has-associated-label */}
            <th />
          </tr>
        </thead>

        <tbody>
          {posts.map(post => (
            <PostItem
              key={post.id}
              post={post}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};
