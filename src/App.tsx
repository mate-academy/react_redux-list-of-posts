/* eslint-disable */
import React, { useEffect } from 'react';
import * as usersActions from './features/users';
import * as postsActions from './features/posts';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { selectedPostSlice } from './features/selectedPost';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const author = useAppSelector(state => state.author);
  const { isUsersLoading } = useAppSelector(state => state.users);
  const { posts, hasError, loaded } = useAppSelector(state => state.posts);
  const clearPosts = () =>
    dispatch(postsActions.postsSlice.actions.clearPosts());
  const selectedPost = useAppSelector(state => state.selectedPost);
  const clearSelectedPost = () =>
    dispatch(selectedPostSlice.actions.clearSelectedPost());

  useEffect(() => {
    dispatch(usersActions.init());
  }, []);

  useEffect(() => {
    clearSelectedPost();

    if (author) {
      dispatch(postsActions.init(author.id));
    } else {
      clearPosts();
    }
  }, [author]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                {isUsersLoading ? <Loader /> : <UserSelector />}
              </div>

              <div className="block" data-cy="MainContent">
                {!author && <p data-cy="NoSelectedUser">No user selected</p>}

                {author && !loaded && <Loader />}

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
              {selectedPost && <PostDetails />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
