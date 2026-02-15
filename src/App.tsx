import React from 'react';
import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { Sidebar } from './components/Sidebar';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useAppSelector } from './app/hooks';

export const App: React.FC = () => {
  const author = useAppSelector(state => state.author);
  const { posts, hasError, loaded } = useAppSelector(state => state.posts);

  const renderContent = () => {
    if (!author) {
      return <p data-cy="NoSelectedUser">No user selected</p>;
    }

    if (!loaded) {
      return <Loader />;
    }

    if (hasError) {
      return (
        <div className="notification is-danger" data-cy="PostsLoadingError">
          Something went wrong!
        </div>
      );
    }

    if (posts.length === 0) {
      return (
        <div className="notification is-warning" data-cy="NoPostsYet">
          No posts yet
        </div>
      );
    }

    return <PostsList />;
  };

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
                {renderContent()}
              </div>
            </div>
          </div>
          <Sidebar />
        </div>
      </div>
    </main>
  );
};
