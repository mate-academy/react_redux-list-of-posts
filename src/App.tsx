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
import { getUsers } from './api/users';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { usersSlice } from './features/users';
import { postsSlice } from './features/posts';

export const App: React.FC = () => {
  // start my code
  const dispatch = useAppDispatch();
  const author = useAppSelector(state => state.users.selectedUser);
  const posts = useAppSelector(state => state.posts.items);
  const postsLoaded = useAppSelector(state => state.posts.loaded);
  const postsError = useAppSelector(state => state.posts.hasError);
  const selectedPost = useAppSelector(state => state.posts.selectedPost);

  useEffect(() => {
    getUsers().then(list => dispatch(usersSlice.actions.setUsers(list)));
  }, []);

  //end

  function loadUserPosts(userId: number) {
    dispatch(postsSlice.actions.setLoaded(false));

    getUserPosts(userId)
      .then(list => dispatch(postsSlice.actions.setPosts(list)))
      .catch(() => dispatch(postsSlice.actions.setError(true)))
      .finally(() => dispatch(postsSlice.actions.setLoaded(true)));
  }

  useEffect(() => {
    dispatch(postsSlice.actions.setPost(null));

    if (author) {
      loadUserPosts(author.id);
    } else {
      dispatch(postsSlice.actions.setPosts([]));
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

                {author && !postsLoaded && <Loader />}

                {author && postsLoaded && postsError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {author && postsLoaded && !postsError && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {author && postsLoaded && !postsError && posts.length > 0 && (
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
