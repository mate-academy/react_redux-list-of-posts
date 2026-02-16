import React, { useEffect } from 'react';
import classNames from 'classnames';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import { PostsList } from './components/PostList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setCurrentUser } from './features/currentUser/currentUserSlice';
import {
  setSelectedPost,
  clearSelectedPost,
} from './features/selectedPost/selectedPostSlice';
import { fetchUsers } from './features/users/usersSlice';
import { fetchUserPosts, clearPosts } from './features/posts/postsSlice';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector(state => state.currentUser.item);
  const {
    items: posts,
    loaded: postsLoaded,
    hasError: postsError,
  } = useAppSelector(state => state.posts);
  const selectedPost = useAppSelector(state => state.selectedPost.item);
  const { loaded, hasError, loading } = useAppSelector(state => state.users);

  useEffect(() => {
    if (!loaded && !hasError && !loading) {
      dispatch(fetchUsers());
    }
  }, [dispatch, loaded, hasError, loading]);

  useEffect(() => {
    dispatch(clearSelectedPost());

    if (currentUser) {
      dispatch(fetchUserPosts(currentUser.id));
    } else {
      dispatch(clearPosts());
    }
  }, [currentUser, dispatch]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  value={currentUser}
                  onChange={user => dispatch(setCurrentUser(user))}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!currentUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}
                {currentUser && !postsLoaded && <Loader />}
                {currentUser && postsLoaded && postsError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}
                {/* eslint-disable @typescript-eslint/indent */}
                {currentUser &&
                  postsLoaded &&
                  !postsError &&
                  posts.length === 0 && (
                    <div
                      className="notification is-warning"
                      data-cy="NoPostsYet"
                    >
                      {' '}
                      No posts yet{' '}
                    </div>
                  )}
                {currentUser &&
                  postsLoaded &&
                  !postsError &&
                  posts.length > 0 && (
                    <PostsList
                      posts={posts}
                      selectedPostId={selectedPost?.id}
                      onPostSelected={post => dispatch(setSelectedPost(post))}
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
                'Sidebar--open': selectedPost,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost && <PostDetails post={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
