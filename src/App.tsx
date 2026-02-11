import React from 'react';
import classNames from 'classnames';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';
import { PostDetails } from './components/PostDetails';
import { UserSelector } from './components/UserSelector';
import { UserPosts } from './components/UrerPosts';
import { useAppSelector } from './app/hooks';

export const App: React.FC = () => {
  const { selectedPost } = useAppSelector(state => state.posts);

  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor my-container">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div className="block">
                <UserSelector />
              </div>

              <div className="block" data-cy="MainContent">
                <UserPosts />
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
