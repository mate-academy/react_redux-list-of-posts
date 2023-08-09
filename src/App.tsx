import React, { useEffect } from 'react';
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

  const selectedPost = useAppSelector(state => state.post);

  useEffect(() => {
    dispatch(postActions.removePost());
    if (author) {
      dispatch(init(author.id));
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
                'Sidebar--open': selectedPost.post,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost.post && selectedPost.post.id !== null && (
                <PostDetails />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
