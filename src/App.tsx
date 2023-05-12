import React, { useEffect } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from './app/hooks';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { getUsers } from './api/users';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getUserPosts } from './api/posts';
import { authorStates } from './features/authorSlice';
import {
  postsStates,
  actions as actionsPosts,
} from './features/postsSlice';
import {
  selectedPostStates,
  actions as actionsSelectedPost,
} from './features/selectedPostSlice';
import { actions as actionUser } from './features/usersSlice';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const author = useAppSelector(authorStates);
  const {
    loaded,
    items: posts,
    hasError,
  } = useAppSelector(postsStates);
  const selectedPost = useAppSelector(selectedPostStates);
  const {
    setLoading,
    setHasError,
    setItems,
  } = actionsPosts;
  const { set: setUser } = actionUser;
  const { set: setSelectedPost } = actionsSelectedPost;
  const authorId = author?.id;

  function loadUserPosts(userId: number) {
    dispatch(setLoading(false));
    dispatch(setHasError(false));

    getUserPosts(userId)
      .then(items => dispatch(setItems(items)))
      .catch(() => dispatch(setHasError(true)))
      .finally(() => dispatch(setLoading(true)));
  }

  useEffect(() => {
    getUsers()
      .then(users => dispatch(setUser(users)));
  }, []);

  useEffect(() => {
    dispatch(setSelectedPost(null));

    if (authorId) {
      loadUserPosts(authorId);
    } else {
      dispatch(setItems([]));
    }
  }, [authorId]);

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
                <PostDetails />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
