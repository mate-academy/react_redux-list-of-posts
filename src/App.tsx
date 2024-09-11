import React from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useAppSelector } from './app/hooks';
import { LoadingStatuses } from './enums/LoadingStatuses';

export const App: React.FC = () => {
  const { idle, loading, error } = LoadingStatuses;
  const { posts, postsLoadStatus, activePost } = useAppSelector(
    state => state.posts,
  );
  const { author } = useAppSelector(state => state.users);
  const arePosts = posts.length > 0;

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
                {!author && <p data-cy="NoSelectedUser">No user selected</p>}

                {author && postsLoadStatus === loading && <Loader />}

                {author && postsLoadStatus === error && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author && postsLoadStatus === idle && !arePosts && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author && postsLoadStatus === idle && arePosts && (
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
                'Sidebar--open': activePost,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {activePost && <PostDetails post={activePost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
