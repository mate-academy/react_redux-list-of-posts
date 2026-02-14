import React, { useEffect } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { init as loadUsers } from './features/users/usersSlice';
import { fetchUserPosts } from './features/posts/PostsSlice';
import { PostsContainer } from './components/PostsContainer/PostsContainer';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();
  const { loaded, posts, hasError, selectedPost } = useAppSelector(
    state => state.posts,
  );
  const { chosenUser } = useAppSelector(state => state.users);

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

  useEffect(() => {
    if (chosenUser) {
      dispatch(fetchUserPosts(chosenUser.id));
    }
  }, [chosenUser]);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector value={chosenUser} />
              </div>
              <PostsContainer
                loaded={loaded}
                items={posts}
                hasError={hasError}
              />
            </div>
          </div>

          <div
            data-cy="Sidebar"
            className={classNames(
              'tile',
              'is-parent',
              'is-8-desktop',
              'Sidebar',
              'Sidebar--open',
            )}
          >
            <div className="tile is-child box is-success ">
              {selectedPost ? (
                <PostDetails post={selectedPost} />
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
