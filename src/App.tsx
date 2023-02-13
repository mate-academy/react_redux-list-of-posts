import React from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './features/posts/PostsList';
import { PostDetails } from './features/comments/PostDetails';
import { UserSelector } from './features/users/UserSelector';
import { Loader } from './components/Loader';
import { useAppSelector } from './app/hooks';
import { useGetUserPostsQuery } from './features/posts/postsApi';
import { useGetUsersQuery } from './features/users/usersApi';
import { selectPost } from './features/posts/postsSlice';
import { selectUser } from './features/users/usersSlice';

export const App: React.FC = () => {
  const currentUser = useAppSelector(selectUser);
  const currentPost = useAppSelector(selectPost);

  const {
    isLoading: isLoadingUsers,
    isFetching: isFetchingUsers,
    isError: isErrorUsers,
  } = useGetUsersQuery();

  const {
    data: posts,
    isLoading: isLoadingPosts,
    isFetching: isFetchingPosts,
    isError: isErrorPosts,
  } = useGetUserPostsQuery(currentUser?.id || 0);

  const isErrorMessageShown = (
    currentUser
    && !isLoadingPosts
    && !isFetchingPosts
    && isErrorPosts
  );

  const isNoPostsYetMessageShown = (
    currentUser
    && !isLoadingPosts
    && !isFetchingPosts
    && !isErrorPosts
    && !!posts
    && !posts.length
  );

  const isPostListShown = (
    currentUser
    && !isLoadingPosts
    && !isFetchingPosts
    && !isErrorPosts
    && !!posts
    && !!posts.length
  );

  if (isLoadingUsers || isFetchingUsers) {
    return <Loader />;
  }

  if (isErrorUsers) {
    return (
      <div className="notification is-danger">
        Something went wrong! Cannot load users.
      </div>
    );
  }

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

                {currentUser && (isLoadingPosts || isFetchingPosts) && (
                  <Loader />
                )}

                {isErrorMessageShown && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {isNoPostsYetMessageShown && (
                  <div
                    className="notification is-warning"
                    data-cy="NoPostsYet"
                  >
                    No posts yet
                  </div>
                )}

                {isPostListShown && (
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
