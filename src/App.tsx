import React, { useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
// import { Post } from './types/Post';
import { useAppDispatch, useAppSelector } from './app/hooks';
import * as actionsUsers from './features/users/usersSlice';
import * as actionsCurrentUser from './features/currentUser/currentUserSlice';
import * as actionsPosts from './features/posts/postsSlice';
import * as actionsPost from './features/currentPost/currentPost';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const [hasError, setError] = useState(false);
  const dispatch = useAppDispatch();
  const { users, loading, error } = useAppSelector(state => state.users);
  const { currentUser } = useAppSelector(state => state.currentUser);
  const { currentPost } = useAppSelector(state => state.currentPost);
  const { posts } = useAppSelector(state => state.posts);
  const currentUserId = useAppSelector(state => state
    .currentUser.currentUser?.id);
  const visiblePosts = currentUserId
    ? posts.filter(post => post.userId === currentUserId)
    : posts;

  const loadUserPosts = (userId: number) => {
    setError(true);
    dispatch(actionsPost.postThunk(userId));
    setError(false);
  };

  const setUserId = (user: User) => {
    dispatch(actionsCurrentUser.setUser(user));
  };

  const setCurrentPost = (post: Post | null) => {
    dispatch(actionsPost.setPost(post));
  };

  useEffect(() => {
    dispatch(actionsUsers.usersThunk());
    dispatch(actionsPosts.postsThunks());

    if (currentUser) {
      loadUserPosts(currentUser.id);
    } else {
      dispatch(actionsPosts.setPosts([]));
    }
  }, [currentUser?.id]);

  return (
    <main className="section">
      {/* Learn the Redux Toolkit usage example in src/app and src/features/counter */}

      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  users={users}
                  value={currentUser}
                  onChange={setUserId}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!currentUserId && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {currentUserId && loading === true && (
                  <Loader />
                )}

                {currentUserId && hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    {error}
                  </div>
                )}

                {currentUserId !== currentPost?.userId
                  && loading === false && visiblePosts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {currentUser && loading === false && visiblePosts.length > 0
                  && (
                    <PostsList
                      visiblePosts={visiblePosts}
                      selectedPostId={currentPost?.id}
                      onPostSelected={setCurrentPost}
                    />
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
                'Sidebar--open': currentPost?.userId === currentUser?.id,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {currentPost && (
                <PostDetails
                  post={currentPost}
                  hasError={hasError}
                  setError={setError}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
