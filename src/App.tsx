/* eslint-disable @typescript-eslint/indent */
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
import * as usersActions from './features/users/users';
import * as postsActions from './features/posts/posts';
import * as selectedPostActions from './features/posts/selectedPost';

export const App: React.FC = () => {
  const { loading, error, posts } = useAppSelector(state => state.posts);

  const author = useAppSelector(state => state.author);
  const selectedPost = useAppSelector(state => state.selectedPost);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(selectedPostActions.set(null));

    dispatch(usersActions.init());

    if (author.id !== 0) {
      dispatch(postsActions.loadPosts(author.id));
    } else {
      dispatch(postsActions.set([]));
    }
  }, [author, dispatch]);

  const isAuthorSelected = author.id !== 0;

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
                {!isAuthorSelected && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {isAuthorSelected && loading && <Loader />}

                {isAuthorSelected && loading && error && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {isAuthorSelected &&
                  !loading &&
                  !error &&
                  posts.length === 0 && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      No posts yet
                    </div>
                  )}

                {isAuthorSelected && !loading && !error && posts.length > 0 && (
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
