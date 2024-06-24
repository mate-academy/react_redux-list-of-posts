import React, { useCallback, useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getUserPosts } from './api/posts';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { postsSlice } from './features/posts';
import { selectedPostSlice } from './features/selectedPost';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const author = useAppSelector(state => state.author);
  const selectedPost = useAppSelector(state => state.selectedPost);
  const { posts, error, loading } = useAppSelector(state => state.posts);

  const loadUserPosts = useCallback(
    (userId: number) => {
      dispatch(postsSlice.actions.setLoading(false));

      getUserPosts(userId)
        .then(postsFromServer =>
          dispatch(postsSlice.actions.setPosts(postsFromServer)),
        )
        .catch(() => dispatch(postsSlice.actions.setError(true)))
        .finally(() => dispatch(postsSlice.actions.setLoading(true)));
    },
    [dispatch],
  );

  useEffect(() => {
    dispatch(selectedPostSlice.actions.remove());

    if (author) {
      loadUserPosts(author.id);
    } else {
      dispatch(postsSlice.actions.setPosts([]));
    }
  }, [author, dispatch, loadUserPosts]);

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

                {author && !loading && <Loader />}

                {author && loading && error && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author && loading && !error && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author && loading && !error && posts.length > 0 && (
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
