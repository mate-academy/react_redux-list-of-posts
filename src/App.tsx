import React, { useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getUsersAsync } from './features/users/users';
import { actions as postsActions, getPostsAsync } from './features/posts/posts';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { User } from './types/User';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const author = useAppSelector<User | null>(state => state.author);
  const hasError = useAppSelector(state => state.posts.error);
  const posts = useAppSelector(state => state.posts.posts);
  const loaded = useAppSelector(state => state.posts.loaded);
  const currentPost = useAppSelector(state => state.posts.currentPost);

  function loadUserPosts(userId: number) {
    dispatch(getPostsAsync(userId));
  }

  useEffect(() => {
    dispatch(postsActions.setCurrentPost(null));

    if (!author) {
      return;
    }

    loadUserPosts(author?.id);
  }, [author]);
  // }, [author?.id]);

  useEffect(() => {
    dispatch(getUsersAsync());
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
                'Sidebar--open': currentPost,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {currentPost && (
                <PostDetails />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
