import React, { useCallback, useEffect, useState } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { Counter } from './features/counter/Counter';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { loadUsers } from './features/users/usersSlice';
import { selectAuthor } from './features/author/authorSlice';
import { clear, loadPosts, selectPosts } from './features/posts/postsSlice';
import {
  selectSelectedPost,
  setSelectedPost,
} from './features/selectedPost/selectedPostSlice';
import { Post } from './types/Post';

export const App: React.FC = () => {
  const posts = useAppSelector(selectPosts);
  const author = useAppSelector(selectAuthor);
  const selectedPost = useAppSelector(selectSelectedPost);
  const dispatch = useAppDispatch();

  const [loaded, setLoaded] = useState(true);
  const [hasError, setError] = useState(false);

  const selectPost = useCallback((post: Post | null) => {
    dispatch(setSelectedPost(post));
  }, [setSelectedPost]);

  useEffect(() => {
    dispatch(loadUsers());
  }, []);

  useEffect(() => {
    dispatch(setSelectedPost(null));
    if (!author) {
      dispatch(clear());

      return;
    }

    setLoaded(false);
    dispatch(loadPosts(author.id))
      .then(postsFromServer => {
        setError(postsFromServer.meta.requestStatus === 'rejected');
      })
      .finally(() => setLoaded(true));
  }, [author?.id]);

  return (
    <main className="section">
      {/* Learn the Redux Toolkit usage example in src/app and src/features/counter */}
      <Counter />

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

                {hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author && loaded && !hasError && posts.length === 0 ? (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                ) : (
                  <PostsList
                    posts={posts}
                    selectedPostId={selectedPost?.id}
                    onPostSelected={selectPost}
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
              {selectedPost && loaded && (
                <PostDetails />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
