import { useEffect } from 'react';

import { Loader } from '../Loader/Loader';
import { Notification } from '../Notification/Notification';
import { PostsList } from '../PostsList/PostsList';
import { UserSelector } from '../UserSelector/UserSelector';

import { fetchUsers } from '../../redux/slices/userSlice';
import { fetchUserPosts } from '../../redux/slices/postSlice';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';

import { EStatus } from '../../types/Status.enum';

export const Main: React.FC = () => {
  const {
    currentUser,
    status: userStatus,
  } = useAppSelector(state => state.users);
  const {
    posts,
    status: postsStatus,
  } = useAppSelector(state => state.posts);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  useEffect(() => {
    if (!currentUser) {
      return;
    }

    dispatch(fetchUserPosts(currentUser.id));
  }, [currentUser]);

  return (
    <div className="tile is-parent">
      <div className="tile is-child box is-success">
        <UserSelector />

        <div className="block" data-cy="MainContent">
          {userStatus === EStatus.SUCCESS && !currentUser && (
            <p data-cy="NoSelectedUser">
              No user selected
            </p>
          )}

          {userStatus === EStatus.ERROR && (
            <Notification
              isStyle="is-danger"
              message="Something went wrong during users loading!"
              cypressData="UsersLoadingError"
            />
          )}

          {postsStatus === EStatus.SUCCESS && (
            posts.length ? (
              <PostsList />
            ) : (
              <Notification
                isStyle="is-warning"
                message="No posts yet"
                cypressData="NoPostsYet"
              />
            )
          )}

          {postsStatus === EStatus.ERROR && (
            <Notification
              isStyle="is-danger"
              message="Something went wrong during posts loading!"
              cypressData="PostsLoadingError"
            />
          )}

          {(postsStatus === EStatus.PENDING) && (
            <Loader />
          )}
        </div>
      </div>
    </div>
  );
};
