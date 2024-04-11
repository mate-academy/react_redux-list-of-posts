import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getUserPosts } from './api/posts';
import * as usersAction from './features/usersSlice';
import * as userPostsAction from './features/usersPostsSlice';
import { useAppDispatch, useAppSelector } from './app/hooks';
import classNames from 'classnames';

export const App: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const [hasError, setError] = useState(false);
  const dispatch = useAppDispatch();
  const { author } = useAppSelector(state => state.users);
  const { selectedPost, userPosts } = useAppSelector(state => state.userPosts);

  useEffect(() => {
    dispatch(usersAction.init());
  }, [dispatch]);

  useEffect(() => {
    dispatch(userPostsAction.setSelectedPost(null));

    if (author) {
      setLoaded(false);
      getUserPosts(author.id)
        .then(response => {
          dispatch(userPostsAction.setUserPosts(response));
        })
        .catch(() => setError(true))
        .finally(() => setLoaded(true));
    } else {
      dispatch(userPostsAction.setUserPosts([]));
    }
  }, [author, dispatch]);

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

                {author && loaded && !hasError && userPosts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author && loaded && !hasError && userPosts.length > 0 && (
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
              {selectedPost && <PostDetails post={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
