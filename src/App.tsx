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

export const App: React.FC = () => {
  const posts = useAppSelector(state => state.posts.posts);

  const loaded = useAppSelector(state => state.posts.loading);
  const hasError = useAppSelector(state => state.posts.error);

  const author = useAppSelector(state => state.author);
  const isAuthorSet = author.name;

  const selectedPost = useAppSelector(state => state.selectedPost);

  const showSidebarCondition = selectedPost.id > 0
    && selectedPost.userId === author.id;

  const errorCondition = isAuthorSet && !loaded && hasError;
  const noPostsCondition = isAuthorSet
    && !loaded
    && !hasError
    && posts.length === 0;
  const noErrorsCondition = isAuthorSet
    && !loaded
    && !hasError
    && posts.length > 0;

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector value={author} />
              </div>

              <div className="block" data-cy="MainContent">
                {!isAuthorSet && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {isAuthorSet && loaded && (
                  <Loader />
                )}

                {errorCondition && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {noPostsCondition && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {noErrorsCondition && (
                  <PostsList
                    posts={posts}
                    selectedPostId={selectedPost?.id}
                  />
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
                'Sidebar--open': showSidebarCondition,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {(selectedPost.id > 0) && (
                <PostDetails post={selectedPost} />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
