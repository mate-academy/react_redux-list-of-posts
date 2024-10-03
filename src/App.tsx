import React from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { User } from './types/User';
import { usePostsQuery } from './api/api';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { setSelectedUser } from './features/users/usersSlice';
import { setSelectedPost } from './features/posts/postsSlice';

export const App: React.FC = () => {
  const {
    data: posts = [],
    isUninitialized,
    isError,
    isLoading,
    isSuccess,
  } = usePostsQuery();
  const dispatch = useAppDispatch();
  const selectedUser = useAppSelector(state => state.users.selectedUser);
  const selectedPost = useAppSelector(state => state.posts.selectedPost);
  const handleOnChange = (user: User) => {
    dispatch(setSelectedUser(user));
    dispatch(setSelectedPost(null));
  };

  return (
    <main className="section">
      <div className="container">
        <div className="grid">
          <div className="cell">
            <div className="box is-success">
              <div className="block">
                <UserSelector value={selectedUser} onChange={handleOnChange} />
              </div>

              <div className="block" data-cy="MainContent">
                {!selectedUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}

                {selectedUser && (isLoading || isUninitialized) && <Loader />}

                {selectedUser && isError && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {selectedUser && isSuccess && posts.length === 0 && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}

                {selectedUser && isSuccess && posts.length > 0 && <PostsList />}
              </div>
            </div>
          </div>
          <div
            data-cy="Sidebar"
            className={classNames('cell', 'Sidebar', {
              'Sidebar--open': selectedPost,
            })}
          >
            <div className="box is-success ">
              {selectedPost && <PostDetails post={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
