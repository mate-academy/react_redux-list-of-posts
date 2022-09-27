import React, { useEffect, useState } from 'react';

import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelect } from './components/UserSelect';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { postsAsync } from './features/postsSlice/postsSlice';

export const App: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const [hasError, setError] = useState(false);
  const { author } = useAppSelector(state => state.users);

  const { posts, selectedPost } = useAppSelector(state => state.posts);

  const dispatch = useAppDispatch();

  function loadUserPosts(userId: number) {
    setLoaded(false);
    dispatch(postsAsync(userId))
      .catch(() => setError(true))
      .finally(() => setLoaded(true));
  }

  useEffect(() => {
    if (author) {
      loadUserPosts(author.id);
    }
  }, [author?.id]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelect />
              </div>

              <div className="block">
                {!author && (
                  <p>No user selected</p>
                )}

                {author && !loaded && (
                  <Loader />
                )}

                {author && loaded && hasError && (
                  <div className="notification is-danger">
                    Something went wrong!
                  </div>
                )}

                {author && loaded && !hasError && posts.length === 0 && (
                  <div className="notification is-warning">
                    No posts yet
                  </div>
                )}

                {author && loaded && !hasError && posts.length > 0 && (
                  <PostsList />
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
