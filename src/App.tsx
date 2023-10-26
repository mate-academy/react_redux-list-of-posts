import React, { useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setUsers } from './features/users/usersSlice';
import { getUsers } from './api/users';
import { loadUserPosts } from './thunks/postsThunk';
import { setSelectedPost } from './features/posts/postsSlice';

export const App: React.FC = () => {
  const { currentUser } = useAppSelector(state => state.users);

  const {
    loaded, isError, posts, selectedPost,
  } = useAppSelector(state => state.posts);

  const dispatch = useAppDispatch();

  useEffect(() => {
    getUsers().then(
      usersFromServer => dispatch(setUsers(usersFromServer)),
    );
    dispatch(setSelectedPost(null));

    if (currentUser) {
      dispatch(loadUserPosts(currentUser.id));
    }
  }, [currentUser, dispatch]);

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
                {!currentUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {currentUser && !loaded && (
                  <Loader />
                )}

                {currentUser && loaded && isError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {currentUser && loaded && !isError && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {currentUser && loaded && !isError && posts.length > 0 && (
                  <PostsList />
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
              {selectedPost && (
                <PostDetails />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
