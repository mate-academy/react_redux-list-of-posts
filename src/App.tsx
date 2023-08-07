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
import { getFromServerPost } from './features/postAPI';
import { Posts, selectCurrentUser, takeSelectPost } from './app/store';
import { Status } from './enum/enum';

export const App: React.FC = () => {
  const { selectPost } = useAppSelector(takeSelectPost);
  const { currentrUser } = useAppSelector(selectCurrentUser);
  const { status, posts } = useAppSelector(Posts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (currentrUser) {
      dispatch(getFromServerPost(currentrUser.id));
    }
  }, [currentrUser]);

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
                {!currentrUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {currentrUser && status === Status.loading && (
                  <Loader />
                )}

                {currentrUser && status === Status.failed && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {currentrUser
                && status === Status.idle
                && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {currentrUser && status === Status.idle && posts.length > 0 && (
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
                'Sidebar--open': selectPost,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectPost && (
                <PostDetails />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
