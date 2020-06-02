import React from 'react';
import { useSelector } from 'react-redux';

import './App.scss';
import { Start } from './components/Start';

import * as store from './store';
import PostsList from './components/PostsList';

const App = () => {
  const posts = useSelector(store.getPosts);
  const errorMessage = useSelector(store.getErrorMessage);

  return (
    <div className="app">
      <h1 className="app__title">
        Redux list of posts
      </h1>
      {posts.length === 0 ? (
        <Start />
      ) : (
        <PostsList posts={posts} />
      )}
      {errorMessage !== '' && (
        <div className="app__error">
          <span className="app__error-title">
            An error has occured:
          </span>
          <span className="app__error-text">
            {errorMessage}
          </span>
        </div>
      )}
    </div>
  );
};

export default App;
