import React, { useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { users } from './components/UsersContext';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './app/store';
import type { AppDispatch } from './app/store';
import { posts, setClearSelected } from './components/PostsContext';
import { useAppSelector } from './app/hooks';
import { PostDetails } from './components/PostDetails';

export const App: React.FC = () => {
  const userSelect = useAppSelector(state => state.selectedUser);
  const loadingUserPosts = useSelector(
    (state: RootState) => state.userPosts.loading,
  );
  const hasError = useSelector((state: RootState) => state.userPosts.error);
  const postsUser = useSelector((state: RootState) => state.userPosts.posts);
  const selectedPost = useSelector((state: RootState) => state.userPosts.selectedPost);
  const dispatch = useDispatch<AppDispatch>();

  useEffect(() => {
    dispatch(users());
  }, []);

  useEffect(() => {
    if (userSelect.selectedUser?.id) {
      dispatch(posts(userSelect.selectedUser?.id));
      dispatch(setClearSelected())
    }
  }, [userSelect]);

  // useEffect(() => {
  //   if (userSelect.selectedUser?.id) {
  //     dispatch(posts(userSelect.selectedUser?.id));
  //   }
  // }, [userSelect]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector />
              </div>

              <div className="block" data-cy="MainContent">
                {!userSelect.selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {loadingUserPosts && userSelect && <Loader />}

                {userSelect && loadingUserPosts && hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {userSelect.selectedUser &&
                  !loadingUserPosts &&
                  !hasError &&
                  postsUser.length === 0 && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  )}

                {userSelect &&
                  !loadingUserPosts &&
                  !hasError &&
                  postsUser.length > 0 && (
                    <PostsList
                    />
                  )}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={classNames(
              'tile',
              'is-parent',
              'is-8-desktop',
              'Sidebar',
              {
                'Sidebar--open': selectedPost,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && selectedPost.id && postsUser &&
                <PostDetails />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
