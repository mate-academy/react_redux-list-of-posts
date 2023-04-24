import React, { useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import {
  postsAsync,
  actions as postsActions,
} from './features/posts/PostsSlice';
import { Counter } from './features/counter/Counter';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { usersAsync } from './features/users/UsersSlice';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const posts = useAppSelector(state => state.posts.posts);
  const loaded = useAppSelector(state => state.posts.loading);
  const hasError = useAppSelector(state => state.posts.error);
  const author = useAppSelector(state => state.users.selectedUser);
  const selectedPost = useAppSelector(state => state.posts.selectedPost);

  function loadUserPosts(userId: number) {
    dispatch(postsAsync(userId));
  }

  useEffect(() => {
    dispatch(usersAsync());
  }, []);

  useEffect(() => {
    dispatch(postsActions.selectedPost(null));

    if (author) {
      loadUserPosts(author.id);
    } else {
      dispatch(postsActions.set([]));
    }
  }, [author?.id]);

  return (
    <main className="section">
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

                {author && loaded && (
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

                {author && !loaded && !hasError && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author && !loaded && !hasError && posts.length > 0 && (
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
