import React, { useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import * as authorActions from './features/authorSlice';
import * as postsActions from './features/postsSlice';
import { useAppDispatch, useAppSelector } from './app/hooks';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const {
    selectedUser,
    setSelectedPost,
  } = useAppSelector(state => state.author);
  const {
    posts,
    loaded,
    hasError,
  } = useAppSelector(state => state.posts);

  const isNoPostYet = selectedUser && loaded && !hasError && !posts.length;
  const isShowPostList = selectedUser && loaded && !hasError && !!posts.length;

  useEffect(() => {
    dispatch(authorActions.init());
  }, []);

  useEffect(() => {
    dispatch(authorActions.actions.setSelectedPost(null));

    if (selectedUser) {
      dispatch(postsActions.init(selectedUser.id));
    } else {
      dispatch(postsActions.actions.setPosts([]));
    }
  }, [selectedUser?.id]);

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
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {selectedUser && !loaded && (
                  <Loader />
                )}

                {selectedUser && loaded && hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {isNoPostYet && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {isShowPostList && (
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
                'Sidebar--open': setSelectedPost,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {setSelectedPost && (
                <PostDetails />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
