import React, { useEffect } from 'react';
import 'bulma/bulma.sass';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import classNames from 'classnames';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { fetchUsers } from './features/users/usersSlice';
import { setAuthor } from './features/author/authorSlice';
import { User } from './types/User';
import { clearPosts, fetchPosts } from './features/posts/postsSlice';
import { clearSelectedPost } from './features/selectedPost/selectedPostSlice';

export const App: React.FC = () => {
  const dispatch = useAppDispatch();

  const { users, author, selectedPost } = useAppSelector(state => ({
    users: state.users,
    author: state.author,
    selectedPost: state.selectedPost,
  }));

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  useEffect(() => {
    dispatch(clearSelectedPost());

    if (author) {
      dispatch(fetchPosts(author.id));
    } else {
      dispatch(clearPosts());
    }
  }, [author]);

  const handleUserChange = (user: User) => {
    dispatch(setAuthor(user));
  };

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector
                  value={author}
                  options={users}
                  onChange={handleUserChange}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {author ? (
                  <PostsList />
                ) : (
                  <p data-cy="NoSelectedUser">No user selected</p>
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
              {selectedPost && <PostDetails post={selectedPost} />}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
