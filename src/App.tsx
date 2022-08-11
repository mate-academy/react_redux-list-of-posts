import React, { useEffect } from 'react';

// We can move CSS imports to index.tsx
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './store/hooks';
import {
  loadPosts,
  setPostsToEmpty,
  setSelectedPost,
} from './store/reducers/postSlice';

export const App: React.FC = () => {
  const { author } = useAppSelector(state => state.users);
  const {
    posts,
    loaded,
    selectedPost,
    hasError,
  } = useAppSelector(state => state.posts);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(setSelectedPost(null));

    if (author) {
      dispatch(loadPosts(author.id));
    } else {
      dispatch(setPostsToEmpty());
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
