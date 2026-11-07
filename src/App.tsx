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
import { loadUsers } from './features/counter/Users/usersSlice';

export const App: React.FC = () => {
  const loadPostsUser = useAppSelector(state => state.posts.loading);
  const userId = useAppSelector(state => state.posts.userSelected.id);
  const hasError = useAppSelector(state => state.posts.error);
  const posts = useAppSelector(state => state.posts.userIdPosts);
  const selectedPost = useAppSelector(state => state.setPost.postSelected);
  const dispatch = useAppDispatch();
  const showNoPosts =
    userId && !loadPostsUser && posts.length === 0 && !hasError;

  useEffect(() => {
    dispatch(loadUsers());
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
                {!userId && <p data-cy="NoSelectedUser">No user selected</p>}

                {loadPostsUser && <Loader />}

                {hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}
                {showNoPosts && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {userId && !loadPostsUser && posts.length > 0 && !hasError && (
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
                'Sidebar--open': Boolean(selectedPost),
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost === null ? (
                <div className="content">Choose a post</div>
              ) : (
                <PostDetails />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
