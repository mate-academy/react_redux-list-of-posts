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
import { getUsers } from './api/users';
import * as usersActions from './features/usersSlice';
import * as postsActions from './features/postsSlice';
import * as selectedPostActions from './features/selectedPostSlice';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const usersLoadingError = useAppSelector(state => state.users.error);
  const { author } = useAppSelector(state => state.author);
  const { loaded, hasError } = useAppSelector(state => state.posts);
  const posts = useAppSelector(state => state.posts.items);
  const { selectedPost } = useAppSelector(state => state.selectedPost);

  useEffect(() => {
    getUsers()
      .then(usersFromServer => {
        dispatch(usersActions.setUsers(usersFromServer));
      })
      .catch(() => dispatch(usersActions.setError(true)));
  }, []);

  function loadUserPosts(userId: number) {
    dispatch(postsActions.setLoaded(false));

    getUserPosts(userId)
      .then(postsFromServer => dispatch(postsActions.setPosts(postsFromServer)))
      .catch(() => dispatch(postsActions.setError(true)))
      .finally(() => dispatch(postsActions.setLoaded(true)));
  }

  useEffect(() => {
    dispatch(selectedPostActions.setSelectedPost(null));

    if (author) {
      loadUserPosts(author.id);
    } else {
      dispatch(postsActions.setPosts([]));
    }
  }, [author?.id]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                {!usersLoadingError
                  ? <UserSelector />
                  : (
                    <div
                      className="notification is-danger"
                      data-cy="PostsLoadingError"
                    >
                      Something went wrong!
                    </div>
                  )}
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
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost
                ? <PostDetails post={selectedPost} />
                : <p data-cy="NoSelectedUser">Choose a post</p>}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
