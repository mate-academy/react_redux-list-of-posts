import React, { useEffect } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import * as usersActions from './features/users';
import { actions as selectedPostActions } from './features/selectedPost';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const { hasError } = useAppSelector(state => state.users);
  const { post: selectedPost } = useAppSelector(state => state.selectedPost);
  const {
    author,
    loaded: postLoaded,
    posts,
    hasError: postError,
  } = useAppSelector(state => state.author);

  useEffect(() => {
    dispatch(usersActions.init());
  }, [dispatch]);

  useEffect(() => {
    dispatch(selectedPostActions.clearPost());
  }, [author, dispatch]);

  const postErrorCheck = postLoaded && !hasError && !postError && author;

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

                {author && !postLoaded && <Loader />}

                {postLoaded && (postError || hasError) && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {postErrorCheck && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {postLoaded &&
                  !hasError &&
                  !postError &&
                  author &&
                  posts.length > 0 && <PostsList />}
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
