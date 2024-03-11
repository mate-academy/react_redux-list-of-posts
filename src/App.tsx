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

import { useAppDispatch, useAppSelector } from './app/hooks';
import { actions as PostsActions } from './features/posts/postsSlice';
// eslint-disable-next-line max-len
import { actions as SelectedPostActions } from './features/selectedPost/selectedPostSlice';

export const App: React.FC = () => {
  const author = useAppSelector(state => state.author.author);
  const posts = useAppSelector(state => state.posts.items);
  const selectedPost = useAppSelector(state => state.selectedPost.post);

  const hasError = useAppSelector(state => state.posts.hasError);
  const loaded = useAppSelector(state => state.posts.loaded);

  const dispatch = useAppDispatch();

  function loadUserPosts(userId: number) {
    dispatch(PostsActions.setLoaded(false));

    getUserPosts(userId)
      .then(postsFromAPI => dispatch(PostsActions.set(postsFromAPI)))
      .catch(() => dispatch(PostsActions.setError(true)))
      .finally(() => dispatch(PostsActions.setLoaded(true)));
  }

  useEffect(() => {
    dispatch(SelectedPostActions.set(null));

    if (author) {
      loadUserPosts(author.id);
    } else {
      dispatch(PostsActions.clear());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
