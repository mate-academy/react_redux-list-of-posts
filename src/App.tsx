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
import * as postActions from './features/postsSlice';
import { currentPostSlice } from './features/currentPostSlice';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(state => state.currentUser);
  const { posts, loading, error } = useAppSelector(state => state.posts);
  const currentPost = useAppSelector(state => state.currentPost);

  function loadUserPosts(userId: number) {
    dispatch(postActions.init(userId));
  }

  useEffect(() => {
    dispatch(currentPostSlice.actions.set(null));

    if (currentUser) {
      loadUserPosts(currentUser.id);
    } else {
      dispatch(postActions.clear());
    }
  }, [currentUser]);

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
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {currentUser && loading && <Loader />}

                {currentUser && !loading && error && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {currentUser && !loading && !error && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {currentUser && !loading && !error && posts.length > 0 && (
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
                'Sidebar--open': currentPost,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {currentPost && <PostDetails />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
