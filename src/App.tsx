/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react';
import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';

import { loadUsersAsync } from './features/usersSlice';
import { useAppDispatch, useAppSelector } from './app/hooks';
import { clearPosts, loadPostsAsync } from './features/postsSlice';
import { clearSelect, selectSelectedPost } from './features/selectedPostSlice';
import { MainContent } from './components/MainContent';
import { selectAuthor } from './features/authorSlice';

export const App: React.FC = () => {
  const author = useAppSelector(selectAuthor);
  const selectedPost = useAppSelector(selectSelectedPost);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadUsersAsync());
  }, []);

  useEffect(() => {
    dispatch(clearPosts());

    dispatch(author ? loadPostsAsync(author.id) : clearSelect());
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
                <MainContent />
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
              <PostDetails />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
