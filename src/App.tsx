import React, { useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getUserPosts } from './api/posts';
import { useAppDispatch } from './app/hooks';
import {
  selectCurrentPost,
  selectPosts,
  selectPostsError,
  selectPostsIsLoading,
  setPosts,
  setPostsError,
  setPostsIsLoading,
  setSelectedPostId,
} from './features/postsSlice';
import {
  selectCurrentUser,
  setUsers,
  setUsersError,
  setUsersIsLoading,
} from './features/usersSlice';
import { getUsers } from './api/users';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const author = useSelector(selectCurrentUser);
  const selectedPost = useSelector(selectCurrentPost);
  const posts = useSelector(selectPosts);
  const hasError = useSelector(selectPostsError);
  const isLoading = useSelector(selectPostsIsLoading);

  function loadUserPosts(userId: number) {
    dispatch(setPostsIsLoading(true));

    getUserPosts(userId)
      .then(receivedPosts => dispatch(setPosts(receivedPosts)))
      .catch(() => dispatch(setPostsError(true)))
      .finally(() => dispatch(setPostsIsLoading(false)));
  }

  useEffect(() => {
    dispatch(setSelectedPostId(null));

    if (author) {
      loadUserPosts(author.id);
    } else {
      dispatch(setPosts([]));
    }
  }, [author?.id]);

  useEffect(() => {
    dispatch(setUsersIsLoading(true));

    getUsers()
      .then(users => dispatch(setUsers(users)))
      .catch(() => dispatch(setUsersError(true)))
      .finally(() => dispatch(setUsersIsLoading(false)));
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

                {author && isLoading && (
                  <Loader />
                )}

                {author && !isLoading && hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author && !isLoading && !hasError && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author && !isLoading && !hasError && posts.length > 0 && (
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
