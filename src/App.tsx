import React from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { Counter } from './features/counter/Counter';
import { useAppSelector } from './app/hooks';
import {
  getError,
  getPosts,
  getSelectedAuthor,
  getLoading,
} from './components/Posts/userPostsSlicer';
import { getPost } from './components/Comments/commentsSlicer';

export const App: React.FC = () => {
  const selectedAuthor = useAppSelector(getSelectedAuthor);
  const authorPosts = useAppSelector(getPosts);
  const error = useAppSelector(getError);
  const loading = useAppSelector(getLoading);
  const selectedPost = useAppSelector(getPost);

  console.log({ selectedPost });

  return (
    <main className="section">
      {/* Learn the Redux Toolkit usage example in src/app and src/features/counter */}
      <Counter />

      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedAuthor && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {selectedAuthor && loading === 'loading' && (
                  <Loader />
                )}

                {
                  selectedAuthor && loading === 'failed'
                  && error === 'Failed to fetch' && (
                    <div
                      className="notification is-danger"
                      data-cy="PostsLoadingError"
                    >
                      Something went wrong!
                    </div>
                  )
                }

                {
                  selectedAuthor.id !== 0
                  && error === ''
                  && authorPosts.length === 0
                  && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  )
                }

                {
                  selectedAuthor
                  && error === '' && authorPosts.length > 0 && (
                    <PostsList />
                  )
                }
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
                <PostDetails post={selectedPost} />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
