/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

import { getUserPosts } from './api/posts';

import { useAppDispatch, useAppSelector } from './app/hooks';

import { actions as postsAction } from './features/posts';
import { actions as selectedPostAction } from './features/selectedPost';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { author } = useAppSelector(state => state.author);
  const { selectedPost } = useAppSelector(state => state.selectedPost);
  const { posts, loading, error } = useAppSelector(state => state.posts);

  const showLoader = author && loading;
  const showError = author && !loading && error;
  const showMessage = author && !loading && !error && !posts.length;
  const showContent = author && !loading && !error && !!posts.length;

  function loadUserPosts(userId: number) {
    dispatch(postsAction.setLoading(true));

    getUserPosts(userId)
      .then(postsFromServer => {
        dispatch(postsAction.set(postsFromServer));
      })
      .catch(() => dispatch(postsAction.setError(true)))
      .finally(() => dispatch(postsAction.setLoading(false)));
  }

  useEffect(() => {
    dispatch(selectedPostAction.set(null));

    if (author) {
      loadUserPosts(author.id);
    } else {
      dispatch(postsAction.set([]));
    }
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

                {showLoader && (
                  <Loader />
                )}

                {showError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {showMessage && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {showContent && (
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
