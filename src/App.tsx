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
import { postsSlice } from './features/slices/postsSlice';
import { selectedPost } from './features/slices/selectedPost';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const author = useAppSelector(state => state.author);
  const { posts, loaded, hasError } = useAppSelector(state => state.posts);
  const { selectedPostItem } = useAppSelector(state => state.selectedPost);

  const { setPosts, setLoaded, setError } = postsSlice.actions;
  const { setSelectedPost } = selectedPost.actions;

  function loadUserPosts(userId: number) {
    dispatch(setLoaded(false));
    dispatch(setError(false));

    const loadPosts = async () => {
      try {
        const res = await getUserPosts(userId);

        dispatch(setPosts(res));
      } catch (err) {
        dispatch(setError(true));
      } finally {
        dispatch(setLoaded(true));
      }
    };

    loadPosts();
  }

  useEffect(() => {
    dispatch(setSelectedPost(null));

    if (author && author.id) {
      loadUserPosts(author.id);
    } else {
      dispatch(setPosts([]));
    }
  }, [author]);

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
                'Sidebar--open': selectedPostItem,
              },
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPostItem && <PostDetails />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
