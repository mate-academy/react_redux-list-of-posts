import React, { useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { fetchUsers } from './features/users';

export const App: React.FC = () => {
  const { author, posts, selectedPost } = useAppSelector(state => state);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

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
                {!author.authorData && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {author.authorData && !posts.loaded && (
                  <Loader />
                )}

                {author.authorData && posts.loaded && posts.hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author.authorData
                  && posts.loaded
                  && !posts.hasError
                  && posts.items.length === 0
                  && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  )}

                {author.authorData
                  && posts.loaded
                  && !posts.hasError
                  && posts.items.length > 0
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
                'Sidebar--open': selectedPost.postData,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost.postData && (
                <PostDetails post={selectedPost.postData} />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
