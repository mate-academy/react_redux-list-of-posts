import React from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { Post } from './types/Post';
import { Counter } from './features/counter/Counter';
import { useAppSelector } from './app/hooks';

export const App: React.FC = () => {
  const author = useAppSelector(state => state.author.value);
  const posts: Post[] = useAppSelector(state => state.posts.value);
  const selectedPost = useAppSelector(state => state.selectedPost.value);
  const statusOfPostsLoading = useAppSelector(state => state.posts.status);
  const statusOfUsersLoading = useAppSelector(state => state.users.status);

  return (
    <main className="section">
      {/* Learn the Redux Toolkit usage example in src/  app and src/features/counter */}
      <Counter />

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

                {statusOfUsersLoading === 'loading'
                  && statusOfPostsLoading === 'loading' && (
                  <Loader />
                )}

                {author && statusOfPostsLoading === 'failed' && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author
                  && statusOfPostsLoading === 'idle'
                  && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author
                  && statusOfPostsLoading === 'idle'
                  && posts.length > 0 && (
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
                <PostDetails post={selectedPost} />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
