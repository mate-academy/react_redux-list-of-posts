import React from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useAppSelector } from './app/hooks';
import {
  getError,
  getPosts,
  getSelectedAuthor,
  getLoading,
} from './components/Posts/userPostsSlicer';
import { getPost } from './components/Comments/commentsSlicer';
import { ErrorTypes, LoadingStatus } from './types/enums';

export const App: React.FC = () => {
  const selectedAuthor = useAppSelector(getSelectedAuthor);
  const authorPosts = useAppSelector(getPosts);
  const error = useAppSelector(getError);
  const loading = useAppSelector(getLoading);
  const selectedPost = useAppSelector(getPost);

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
                {!selectedAuthor.id && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {selectedAuthor && loading === LoadingStatus.Loading && (
                  <Loader />
                )}

                {
                  selectedAuthor && loading === LoadingStatus.Failed
                  && error === ErrorTypes.FailedToFetch && (
                    <div
                      className="notification is-danger"
                      data-cy="PostsLoadingError"
                    >
                      Something went wrong!
                    </div>
                  )
                }

                {
                  !!selectedAuthor.id
                  && !error
                  && !authorPosts.length
                  && loading === LoadingStatus.Idle
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
                  && error === '' && authorPosts.length > 0
                  && loading === LoadingStatus.Idle && (
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
