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

import {
  setHasError,
  setIsLoaded,
  setPosts,
  setSelectedPost,
} from './features/postsSlice';

import { useAppDispatch, useAppSelector } from './app/hooks';
import { RootState } from './app/store';

export const App: React.FC = () => {
  const posts = useAppSelector((state: RootState) => state.posts.items);
  const isLoaded = useAppSelector((state: RootState) => state.posts.isLoaded);
  const hasError = useAppSelector((state: RootState) => state.posts.hasError);
  const selectedPost = useAppSelector((
    state: RootState,
  ) => state.posts.selectedPost);
  const dispatch = useAppDispatch();

  const author = useAppSelector((
    state: RootState,
  ) => state.author.selectedAuthor);

  function loadUserPosts(userId: number) {
    dispatch(setIsLoaded(false));

    getUserPosts(userId)
      .then((data) => dispatch(setPosts(data)))
      .catch(() => dispatch(setHasError(true)))
      .finally(() => dispatch(setIsLoaded(true)));
  }

  useEffect(() => {
    dispatch(setSelectedPost(null));

    if (author) {
      loadUserPosts(author.id);
    } else {
      dispatch(setPosts([]));
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

              <div className="block" data-cy="MainContent">
                {!author && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {author && !isLoaded && (
                  <Loader />
                )}

                {author && isLoaded && hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author && isLoaded && !hasError && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author && isLoaded && !hasError && posts.length > 0 && (
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
