import React, { useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { getUserPosts } from './api/posts';
import { User } from './types/User';
import { Post } from './types/Post';
import { getUsers } from './api/users';
import { actions as usersActions } from './features/users';
import { actions as postsActions } from './features/posts';
import { actions as selectedPostActions } from './features/selectedPost';
import { useAppSelector } from './app/hooks';

export const App: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    getUsers()
      .then((u) => dispatch(usersActions.loadUsers(u)));
  }, []);

  const author = useAppSelector<User | null>(state => state.author);
  const loaded = useAppSelector<boolean>(state => state.posts.loaded);
  const hasError = useAppSelector<boolean>(state => state.posts.hasError);
  const posts = useAppSelector<Post []>(state => state.posts.items);
  const selectedPost = useAppSelector<Post | null>(state => state.selectedPost);

  function loadUserPosts(userId: number) {
    dispatch(postsActions.setLoaded(false));

    getUserPosts(userId)
      .then((p) => dispatch(postsActions.loadPosts(p)))
      .catch(() => dispatch(postsActions.setError(true)))
      // We disable the spinner in any case
      .finally(() => dispatch(postsActions.setLoaded(true)));
  }

  useEffect(() => {
    // we clear the post when an author is changed
    // not to confuse the user
    dispatch(selectedPostActions.setSelectedPost(null));

    if (author) {
      loadUserPosts(author.id);
    } else {
      dispatch(postsActions.loadPosts([]));
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
                <PostDetails />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
