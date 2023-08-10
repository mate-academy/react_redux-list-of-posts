import React, { useEffect, useRef } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { init } from './features/authorSelector';
import { PostDetails } from './components/PostDetails';
import * as postActions from './features/postSlice';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    author,
    posts,
    loaded,
    hasError,
  } = useAppSelector(state => state.author);
  const authorRef = useRef<number>(0);

  const selectedPostId = useAppSelector(state => state.post.post?.id);

  useEffect(() => {
    const Id = () => {
      if (authorRef.current) {
        dispatch(init(authorRef.current));
      }
    };

    window.addEventListener('online', Id);

    return () => window.removeEventListener('online', Id);
  }, []);

  useEffect(() => {
    if (author) {
      authorRef.current = author.id;
      dispatch(postActions.removePost());
      dispatch(init(authorRef.current));
    }
  }, [author]);

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
                  <PostsList posts={posts} />
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
                'Sidebar--open': selectedPostId,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPostId && (
                <PostDetails />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
