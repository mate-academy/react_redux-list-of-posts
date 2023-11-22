import React, { useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setSelectedPost } from './features/selectedPost/selectedPostSlice';
import { postsAsync, clearPosts } from './features/posts/postsSlice';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const { posts, loading, hasError } = useAppSelector(state => state.posts);
  const { author } = useAppSelector(state => state.author);
  const { selectedPost } = useAppSelector(state => state.selectedPost);

  useEffect(() => {
    dispatch(setSelectedPost(null));

    if (author) {
      dispatch(postsAsync(author.id));
    } else {
      dispatch(clearPosts());
    }
  }, [author?.id]);

  const isLoaderVisible = author && loading;
  const isLoadingErrorVisible = author && !loading && hasError;
  const isNoPostsVisible = author && !loading && !hasError && !posts.length;
  const isPostsListVisible = author && !loading && !hasError && !!posts.length;

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

                {isLoaderVisible && (
                  <Loader />
                )}

                {isLoadingErrorVisible && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {isNoPostsVisible && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {isPostsListVisible && (
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
