import React, { useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { Loader } from './components/Loader';

import { Error } from './types/Error';
import { initPosts } from './features/posts';

import { useAppDispatch, useAppSelector } from './app/hooks';
import { UserSelector } from './components/UserSelector';
import { clearSelectedPost } from './features/selectedPost';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { author } = useAppSelector(state => state.author);
  const { selectedPost } = useAppSelector(state => state.selectedPost);
  const {
    posts,
    loaded,
    hasError,
  } = useAppSelector(state => state.posts);

  useEffect(() => {
    if (author) {
      dispatch(initPosts(author.id));
    }

    dispatch(clearSelectedPost());
  }, [author]);

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
                {!author && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {loaded && (
                  <Loader />
                )}

                {(hasError !== Error.None && !loaded) && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {hasError}
                  </div>
                )}

                {(!loaded && !posts.length && !hasError && author) && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {(!!posts.length && !loaded) && (
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
