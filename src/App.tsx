import React, { useEffect } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import * as postActions from './features/posts/postsSlice';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { user } = useAppSelector(state => state.user);
  const { selectedPost } = useAppSelector(state => state.selectedPost);
  const {
    items: posts,
    loaded: postsLoaded,
    hasError: postsHasError,
  } = useAppSelector(state => state.posts);

  useEffect(() => {
    if (user === null) {
      return;
    }

    dispatch(postActions.init(user));
  }, [dispatch, user]);

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
                {!user && <p data-cy="NoSelectedUser">No user selected</p>}
                {user && !postsLoaded && <Loader />}
                {user && postsLoaded && postsHasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}
                {user &&
                  postsLoaded &&
                  !postsHasError &&
                  posts?.length === 0 && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  )}

                {user &&
                  postsLoaded &&
                  !postsHasError &&
                  posts &&
                  posts?.length > 0 && <PostsList />}
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
              {selectedPost && <PostDetails />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
