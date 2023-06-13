import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getUserPosts } from './api/posts';
import { Counter } from './features/counter/Counter';
import { useAppSelector } from './app/hooks';
import { actions as postsActions } from './features/posts/postsSlice';
// eslint-disable-next-line max-len
import { actions as selectedPostActions } from './features/selectedPost/selectedPostSlice';

export const App: React.FC = () => {
  const dispatch = useDispatch();

  const { author } = useAppSelector(state => state.author);
  const { selectedPost } = useAppSelector(state => state.selectedPost);
  const { posts, loaded, hasError } = useAppSelector(state => state.posts);

  function loadUserPosts(userId: number) {
    dispatch(postsActions.setLoaded(false));

    getUserPosts(userId)
      .then(loadedPosts => {
        dispatch(postsActions.set(loadedPosts));
      })
      .catch(() => {
        dispatch(postsActions.setError(true));
      })
      .finally(() => {
        dispatch(postsActions.setLoaded(true));
      });
  }

  useEffect(() => {
    dispatch(selectedPostActions.set(null));

    if (author) {
      loadUserPosts(author.id);
    } else {
      dispatch(postsActions.set([]));
    }
  }, [author?.id]);

  return (
    <main className="section">
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
              {selectedPost && (
                <PostDetails post={selectedPost} />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
