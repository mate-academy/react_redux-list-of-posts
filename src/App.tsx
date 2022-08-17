import React, { useEffect } from 'react';

// We can move CSS imports to index.tsx
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';

import { Navigate, Route, Routes } from 'react-router-dom';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getUserPosts } from './api/posts';
import { useAppDispatch, useAppSelector } from './app/hooks';
import {
  postsLoading,
  postsLoadingFail,
  postsLoadingSuccess,
  selectPosts,
} from './features/posts/postsSlice';
import {
  setUsersSuccess, setUsersFail, loadingUsers,
} from './features/users/usersSlice';
import { getUsers } from './api/users';
import { selectAuthor } from './features/users/authorSlice';
import {
  resetSelectedPost, selectPost,
} from './features/posts/selectedPostSlice';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { posts, loaded: postsLoaded, hasError } = useAppSelector(selectPosts);
  const { author } = useAppSelector(selectAuthor);
  const { selectedPost } = useAppSelector(selectPost);

  function loadUserPosts(userId: number) {
    dispatch(postsLoading());

    getUserPosts(userId)
      .then(postFromServer => dispatch(postsLoadingSuccess(postFromServer)))
      .catch(() => dispatch(postsLoadingFail()));
  }

  useEffect(() => {
    dispatch(loadingUsers());
    getUsers()
      .then(usersFromServer => dispatch(setUsersSuccess(usersFromServer)))
      .catch(() => dispatch(setUsersFail()));
  }, []);

  useEffect(() => {
    dispatch(resetSelectedPost());

    if (author) {
      loadUserPosts(author.id);
    } else {
      dispatch(postsLoadingSuccess([]));
    }
  }, [author?.id]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector />
              </div>

              <div className="block">
                {!author && (
                  <p>No user selected</p>
                )}

                {author && !postsLoaded && (
                  <Loader />
                )}

                {author && postsLoaded && hasError && (
                  <div className="notification is-danger">
                    Something went wrong!
                  </div>
                )}

                {author && postsLoaded && !hasError && !posts.length && (
                  <div className="notification is-warning">
                    No posts yet
                  </div>
                )}

                {author && postsLoaded && !hasError && !!posts.length && (
                  <Routes>
                    <Route path="/">
                      <Route index element={<PostsList />} />
                      <Route path=":id" element={<PostsList />} />
                    </Route>
                    <Route path="/home" element={<Navigate to="/" replace />} />
                  </Routes>
                )}
              </div>
            </div>
          </div>

          <div className="tile is-parent is-8-desktop">
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
