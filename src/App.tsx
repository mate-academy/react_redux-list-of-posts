import React, { useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { MemoizedCounter } from './features/counter/Counter';
import { useAppDispatch, useAppSelector } from './app/hooks';
import {
  getAllUsersAsync,
  selectCurrentUser,
} from './features/users/usersSlice';
import {
  selectCurrentPost,
  selectPosts,
  selectPostsStatus,
} from './features/posts/postsSLice';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedPost = useAppSelector(selectCurrentPost);

  useEffect(() => {
    dispatch(getAllUsersAsync());
  },
  []);

  const postsFromStore = useAppSelector(selectPosts);
  const authorFromStore = useAppSelector(selectCurrentUser);
  const statusPostsDownload = useAppSelector(selectPostsStatus);

  return (
    <main className="section">
      <MemoizedCounter />

      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector />
              </div>

              <div className="block" data-cy="MainContent">
                {!authorFromStore && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                { authorFromStore && (statusPostsDownload === 'loading')
                  && (
                    <>
                      <p>{`${authorFromStore?.name} loading....`}</p>
                      <Loader />
                    </>
                  )}

                { authorFromStore
                  && (statusPostsDownload === 'failed')
                  && (
                    <div
                      className="notification is-danger"
                      data-cy="PostsLoadingError"
                    >
                      Something went wrong!
                    </div>
                  )}

                { authorFromStore
                  && (statusPostsDownload === 'idle')
                  && postsFromStore.length === 0
                  && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  )}

                { authorFromStore
                  && (statusPostsDownload === 'idle')
                  && postsFromStore.length > 0
                  && (
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
