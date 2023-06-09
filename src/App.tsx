import React, { useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails/PostDetails';
import { UserSelector } from './components/UserSelector/UserSelector';
import { Loader } from './components/Loader';

import { useAppDispatch, useAppSelector } from './app/hooks';
import * as postsActions from './features/postsSlice';
import * as commentsActions from './features/commentsSlice';

export const App: React.FC = () => {
  const {
    posts,
    selectedPost,
    loading,
    error,
  } = useAppSelector(state => state.posts);
  const dispatch = useAppDispatch();

  const { currentUser } = useAppSelector(state => state.users);

  function loadUserPosts(userId: number) {
    dispatch(postsActions.fetchPosts(userId));
    dispatch(commentsActions.removeCommentsFromState());
  }

  useEffect(() => {
    dispatch(postsActions.setPost(null));

    if (currentUser) {
      loadUserPosts(currentUser.id);
    }
  }, [currentUser?.id]);

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
                {!currentUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {currentUser && !loading && (
                  <Loader />
                )}

                {currentUser && loading && error && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {currentUser && loading && !error && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {currentUser && loading && !error && posts.length > 0 && (
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
              {selectedPost ? (
                <PostDetails />
              ) : (
                <p>Choose a post</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
