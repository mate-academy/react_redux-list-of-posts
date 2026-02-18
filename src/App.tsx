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
import { useAppDispatch, useAppSelector } from './app/hooks';
import {
  cleanPosts,
  setError,
  setLoaded,
  setPosts,
} from './features/posts/postsSlice';
import { cleanPost } from './features/selectedPost/selectedPostSlice';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const author = useAppSelector(state => state.author.author);
  const posts = useAppSelector(state => state.posts.items);
  const selectedPost = useAppSelector(state => state.selectedPost.selectedPost);
  const loaded = useAppSelector(state => state.posts.loaded);
  const hasError = useAppSelector(state => state.posts.hasError);

  useEffect(() => {
    dispatch(cleanPost());

    if (author) {
      const loadUserPosts = async (userId: number) => {
        dispatch(setLoaded(false));
        dispatch(setError(false));
        dispatch(setPosts([]));

        try {
          const postsUser = await getUserPosts(userId);

          dispatch(setPosts(postsUser));
        } catch {
          dispatch(setError(true));
        } finally {
          dispatch(setLoaded(true));
        }
      };

      loadUserPosts(author.id);
    } else {
      dispatch(cleanPosts());
    }
  }, [author, dispatch]);

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
                {!author && <p data-cy="NoSelectedUser">No user selected</p>}

                {author && !loaded && <Loader />}

                {author && loaded && hasError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author && loaded && !hasError && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author && loaded && !hasError && posts.length > 0 && (
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
              {selectedPost && <PostDetails />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
