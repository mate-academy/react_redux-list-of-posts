import React, { useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getUsers } from './api/users';
import { set as selectPost } from './features/selectedPost/selectedPost';
import { actions as usersActions } from './features/users/usersSlice';
import {
  actions as postsActions,
  fetchUserPosts,
  loadingStatus,
} from './features/posts/postsSlice';
import { useAppSelector, useAppDispatch } from './app/hooks';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const author = useAppSelector(state => state.author.author);
  const posts = useAppSelector(state => state.posts.posts);
  const error = useAppSelector(state => state.posts.hasError);
  const loaded = useAppSelector(state => state.posts
    .loaded === loadingStatus.succeeded);
  const selectedPost = useAppSelector(state => state.selectedPost.post);

  function loadUserPosts(userId: number) {
    dispatch(fetchUserPosts(userId));
  }

  useEffect(() => {
    getUsers()
      .then(users => dispatch(usersActions.set(users)));
  }, [dispatch]);

  useEffect(() => {
    dispatch(selectPost(null));

    if (author) {
      loadUserPosts(author.id);
    } else {
      dispatch(postsActions.set([]));
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
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
                {!author && (
                  <p data-cy="NoSelectedUser">
                    No user selected
                  </p>
                )}

                {author && !loaded && (
                  <Loader />
                )}

                {author && loaded && error && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                    {error}
                  </div>
                )}

                {author && loaded && !error && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author && loaded && !error && posts.length > 0 && (
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
