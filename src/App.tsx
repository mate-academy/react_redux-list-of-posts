import React, { useEffect } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getUserPosts } from './api/posts';
import { User } from './types/User';
import { client } from './utils/fetchClient';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setLoading, setError, setUsers } from './features/users/usersSlice';
import { setHasError, setLoaded, setPosts } from './features/posts/postsSlice';
import { setCurrentPost } from './features/selectedPost/selectedPost';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const selectedPost = useAppSelector(state => state.currentPost);
  const author = useAppSelector(state => state.author);
  const { loading: isUsersLoading } = useAppSelector(state => state.users);

  const {
    items: posts,
    loaded: postsLoaded,
    hasError: postsError,
  } = useAppSelector(state => state.posts);

  function loadUserPosts(userId: number) {
    dispatch(setLoaded(false));
    dispatch(setHasError(false));

    getUserPosts(userId)
      .then(data => dispatch(setPosts(data)))
      .catch(() => dispatch(setHasError(true)))
      .finally(() => {
        dispatch(setLoaded(true));
      });
  }

  useEffect(() => {
    dispatch(setLoading(true));

    client
      .get<User[]>('/users')
      .then(data => {
        dispatch(setUsers(data));
      })
      .catch(e => dispatch(setError(e?.message || 'Error')))
      .finally(() => dispatch(setLoading(false)));
  }, [dispatch]);

  useEffect(() => {
    dispatch(setCurrentPost(null));

    if (author) {
      loadUserPosts(author.id);
    } else {
      dispatch(setPosts([]));
      dispatch(setLoaded(true));
    }
  }, [author]);

  const showNoPostsNotification =
    !isUsersLoading &&
    author &&
    postsLoaded &&
    !postsError &&
    posts.length === 0;

  const shouldShowPosts =
    !isUsersLoading && author && postsLoaded && !postsError && posts.length > 0;

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
                {isUsersLoading && <Loader />}

                {!isUsersLoading && !author && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {!isUsersLoading && author && !postsLoaded && !postsError && (
                  <Loader />
                )}

                {!isUsersLoading && author && postsLoaded && postsError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {showNoPostsNotification && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {shouldShowPosts && (
                  <PostsList
                    posts={posts}
                    selectedPostId={selectedPost?.id}
                    onPostSelected={post => dispatch(setCurrentPost(post))}
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
