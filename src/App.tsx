import React, { useCallback, useEffect, useState } from 'react';
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
import { postsActions } from './features/posts';
import { postActions } from './features/post';
import { fetchUsers } from './features/users';

export const App: React.FC = () => {
  const posts = useAppSelector(state => state.posts);
  const dispatch = useAppDispatch();
  const { author } = useAppSelector(state => state.selectedUser);
  const [loaded, setLoaded] = useState(false);
  const [hasError, setError] = useState(false);

  const loadUserPosts = useCallback(
    (userId: number) => {
      setLoaded(false);

      getUserPosts(userId)
        .then(result => dispatch(postsActions.setPosts(result)))
        .catch(() => setError(true))
        .finally(() => setLoaded(true));
    },
    [dispatch],
  );

  useEffect(() => {
    dispatch(postActions.setPost(null));

    if (author) {
      loadUserPosts(author.id);
    }
  }, [author, dispatch, loadUserPosts]);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

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
                {!author && <p data-cy="NoSelectedUser">No user selected</p>}

                {author && !loaded && <Loader />}

                {author && loaded && hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author && loaded && !hasError && posts.value.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author && loaded && !hasError && posts.value.length > 0 && (
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
              'Sidebar--open',
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
