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

import {
  clearPosts,
  clearPostSelection,
  getPostsAsync,
} from './features/posts/postsSlice';

import { LoadingStatus } from './types/LoadingStatus';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const author = useAppSelector(state => state.users.selectedUser);
  const {
    posts,
    status,
    selectedPost,
  } = useAppSelector(state => state.posts);

  const isLoading = status === LoadingStatus.Loading;
  const isError = status === LoadingStatus.Failed;
  const isFine = status === LoadingStatus.Idle;

  const isAuthorSelected = Boolean(author);
  const hasPosts = Boolean(posts.length);

  useEffect(() => {
    dispatch(clearPostSelection());

    if (author) {
      dispatch(getPostsAsync(author));
    } else {
      dispatch(clearPosts());
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
                {!isAuthorSelected && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isLoading && <Loader />}

                {isError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {isAuthorSelected && isFine && !hasPosts && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {isFine && hasPosts && <PostsList />}
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
              {selectedPost && <PostDetails />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
