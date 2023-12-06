import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import PostsList from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import UserSelector from './components/UserSelector';
import { Loader } from './components/Loader';
import { getUsers } from './api/users';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setUsers } from './features/users';
import * as postsActions from './features/posts';
import { actions as selectedPostActions } from './features/selectedPost';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    author,
    posts: postsState,
    selectedPost,
  } = useAppSelector(state => state);
  // I store this error in state because the task didn't mention storing it in redux
  const [hasUsersError, setUsersError] = useState(false);

  const { loaded, hasError: hasPostsError, items: posts } = postsState;

  function loadUserPosts(userId: number) {
    dispatch(postsActions.initUserPosts(userId));
  }

  // fetch users for dropdowns on first render
  useEffect(() => {
    getUsers()
      .then(users => {
        dispatch(setUsers(users));
      })
      .catch(() => {
        setUsersError(true);
      });
  }, []);

  useEffect(() => {
    // we clear the post when an author is changed
    // not to confuse the user
    dispatch(selectedPostActions.setPost(null));

    if (author) {
      loadUserPosts(author.id);
    } else {
      dispatch(postsActions.setItems([]));
    }
  }, [author?.id]);

  const hasError = hasPostsError || hasUsersError;

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

                {author && !loaded && (
                  <Loader />
                )}

                {author && loaded && hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author && loaded && !hasError && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author && loaded && !hasError && posts.length > 0 && (
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
