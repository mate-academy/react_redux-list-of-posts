import React, { useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getUserPosts } from './api/posts';
import { setUsers, setError as setUsersError } from './features/usersSlice';
import {
  setError as setPostsError, setPosts, setLoaded,
} from './features/postsSlice';
import {
  selectedPost as currentPost,
  postsFromServer, authorFromReducer,
} from './app/selectors';
import {
  set as setSelectedPost,
} from './features/selectedPostSlice';
import { getUsers } from './api/users';
import { useAppDispatch, useAppSelector } from './app/hooks';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const author = useAppSelector(authorFromReducer);
  const {
    items: userPosts, loaded, hasError,
  } = useAppSelector(postsFromServer);
  const selectedPost = useAppSelector(currentPost);

  function loadUserPosts(userId: number) {
    dispatch(setLoaded(false));

    getUserPosts(userId)
      .then(posts => {
        dispatch(setPosts(posts));
      })
      .catch(() => dispatch(setPostsError(true)))
      .finally(() => dispatch(setLoaded(true)));
  }

  useEffect(() => {
    dispatch(setSelectedPost(null));

    if (author) {
      loadUserPosts(author.id);
    } else {
      dispatch(setPosts([]));
    }
  }, [author?.id]);

  useEffect(() => {
    dispatch(setUsersError(false));

    getUsers()
      .then(users => dispatch(setUsers(users)))
      .catch(() => {
        dispatch(setUsersError(true));
      });
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

                {author && loaded && !hasError && userPosts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author && loaded && !hasError && userPosts.length > 0 && (
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
