import React, { useEffect } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getUserPosts } from './api/posts';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as postsAction } from './features/posts';
import * as postsSelectorAction from './features/postSelect';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const postSelect = useAppSelector(state => state.postSelect);
  const userSelect = useAppSelector(state => state.userSelect);

  const { posts, loading, hasError } = useAppSelector(state => state.posts);

  function loadUserPosts(userId: number) {
    dispatch(postsAction.setLoading(true));

    getUserPosts(userId)
      .then(setPosts => {
        dispatch(postsAction.set(setPosts));
      })
      .catch(() => dispatch(postsAction.setError(true)))
      .finally(() => dispatch(postsAction.setLoading(false)));
  }

  useEffect(() => {
    dispatch(postsSelectorAction.setPost({} as Post));

    if (userSelect) {
      loadUserPosts(userSelect.id);
    } else {
      dispatch(postsAction.set([]));
    }

    dispatch({ type: 'postSelect/reset' });
  }, [userSelect]);

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
                {!userSelect.id && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {userSelect && loading && <Loader />}

                {userSelect && !loading && hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {userSelect && !loading && !hasError && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {userSelect && !loading && !hasError && posts.length > 0 && (
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
                'Sidebar--open': postSelect.id,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              <PostDetails />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
