import React, { useEffect } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';

import { useAppDispatch, useAppSelector } from './app/hooks';
import { getPosts } from './services/post.service';
import { getUsers } from './services/users.service';
import {
  setPosts,
  setPostsError,
  setPostsLoading,
  setSelectedPost,
} from './features/postsSlice';
import { setUsers, setUsersError } from './features/usersSlice';

export const App = () => {
  const dispatch = useAppDispatch();

  const { selectedUserId } = useAppSelector(state => state.author);
  const {
    items: posts,
    loaded,
    hasError,
    selectedPost,
  } = useAppSelector(state => state.posts);

  useEffect(() => {
    getUsers()
      .then(users => {
        dispatch(setUsers(users));
      })
      .catch(() => {
        dispatch(setUsersError());
      });
  }, [dispatch]);

  useEffect(() => {
    dispatch(setSelectedPost(null));

    if (selectedUserId === 0) {
      dispatch(setPosts([]));

      return;
    }

    dispatch(setPostsLoading());

    getPosts(selectedUserId)
      .then(data => {
        dispatch(setPosts(data));
      })
      .catch(() => {
        dispatch(setPostsError());
      });
  }, [selectedUserId, dispatch]);

  const isUserSelected = selectedUserId > 0;
  const showLoader = isUserSelected && !loaded;
  const showError = isUserSelected && loaded && hasError;
  const showNoPosts =
    isUserSelected && loaded && !hasError && posts.length === 0;
  const showPostsList =
    isUserSelected && loaded && !hasError && posts.length > 0;

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
                {selectedUserId === 0 && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {showLoader && <Loader />}

                {showError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {showNoPosts && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {showPostsList && <PostsList />}
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
              { 'Sidebar--open': !!selectedPost },
            )}
          >
            <div className="tile is-child box is-success">
              {selectedPost && <PostDetails />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
