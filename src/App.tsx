import React, { useCallback, useEffect } from 'react';

import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import classNames from 'classnames';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

import { useAppDispatch, useAppSelector } from './app/hooks';

import { Counter } from './features/counter/Counter';
import { actions as postsActions } from './features/posts/postsSlice';
import { getUserPostsThunk } from './thunks/PostsThunks';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    posts, loading, error, post,
  } = useAppSelector(state => state.posts);
  const { author } = useAppSelector(state => state.users);

  const loadUserPosts = useCallback((userId: number) => {
    dispatch(getUserPostsThunk(userId));
  }, [dispatch]);

  useEffect(() => {
    dispatch(postsActions.removePost());

    if (author) {
      loadUserPosts(author.id);
    } else {
      dispatch(postsActions.removePosts());
    }
  }, [author, dispatch, loadUserPosts]);

  return (
    <main className="section">
      <Counter />

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

                {author && !loading && (
                  <Loader />
                )}

                {author && loading && error && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author && loading && !error && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author && loading && !error && posts.length > 0 && (
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
                'Sidebar--open': post,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {post && (
                <PostDetails />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
