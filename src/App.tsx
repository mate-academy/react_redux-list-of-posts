import React, { useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useAppDispatch, useAppSelector } from './app/hooks';
import * as userAction from './features/userSlice';
import * as postAction from './features/postSlice';
import { fetchPost } from './features/postSlice';

export const App: React.FC = () => {
  useEffect(() => {
    dispatch(userAction.usersFetch())
  }, []);

  const { isError, isLoader, posts, selectedPost } = useAppSelector(state => state.posts);
  const { selectedUser } = useAppSelector(state => state.users);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (selectedUser) {
        dispatch(fetchPost(selectedUser.id))
    } else {
      dispatch(postAction.clearPosts());
    }
  }, [selectedUser]);

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
                {!selectedUser && <p data-cy="NoSelectedUser">No user selected</p>}

                {selectedUser && isLoader && <Loader />}

                {selectedUser && !isLoader && isError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {selectedUser && !isLoader && !isError && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {selectedUser && !isLoader && !isError && posts.length > 0 && (
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
