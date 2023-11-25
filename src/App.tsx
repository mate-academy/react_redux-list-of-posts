import React, { useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import * as usersActions from './features/users/userS';
import * as postsActions from './features/posts/postS';
import { useAppDispatch, useAppSelector } from './app/hooks';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { useR } = useAppSelector(state => state.users);
  const {
    posts,
    posT,
    error,
    loading,
  } = useAppSelector(state => state.posts);

  useEffect(() => {
    dispatch(usersActions.initUsers());
  }, []);

  useEffect(() => {
    dispatch(postsActions.selectPost(null));

    if (useR) {
      dispatch(postsActions.initPosts(useR.id));
    }
  }, [useR?.id]);

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
                {!useR && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {useR && loading && (
                  <Loader />
                )}

                {useR && !loading && error && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {error}
                  </div>
                )}

                {useR && !loading && !error && !posts.length && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {useR && !loading && !error && !!posts.length && (
                  <PostsList />
                )}
              </div>
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={posT
              ? 'tile is-parent is-8-desktop Sidebar Sidebar--open'
              : 'tile is-parent is-8-desktop Sidebar'}
          >
            <div className="tile is-child box is-success ">
              {posT ? (
                <PostDetails />
              ) : (
                <p>Choose a post</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
