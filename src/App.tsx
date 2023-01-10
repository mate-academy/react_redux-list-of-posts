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
import { fetchUsers } from './store/users/usersAsync';
import { selectSelectedUser } from './store/users/usersSelectors';
import {
  selectCurrentPost,
  selectPosts,
  selectPostsError,
  selectPostsLoaded,
} from './store/posts/postsSelectors';
import { fetchPosts } from './store/posts/postsAsync';
import { postsAction } from './store/posts/postsSlice';

import Notification from './components/Notifications';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const posts = useAppSelector(selectPosts);
  const author = useAppSelector(selectSelectedUser);
  const loaded = useAppSelector(selectPostsLoaded);
  const hasError = useAppSelector(selectPostsError);
  const selectedPost = useAppSelector(selectCurrentPost);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  useEffect(() => {
    dispatch(postsAction.setInitialField('currentPost'));

    if (author) {
      dispatch(fetchPosts(author.id));
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
      <Notification />
    </main>
  );
};
