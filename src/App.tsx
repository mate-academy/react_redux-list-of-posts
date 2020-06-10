import React from 'react';
import { useSelector } from 'react-redux';

import './App.scss';
import { Start } from './components/Start';
import { PostList } from './components/PostList';

import { getPosts, getLoaded } from './store';

const App = () => {
  const posts = useSelector(getPosts);
  const isLoaded = useSelector(getLoaded);

  return (
    <div className="app__header">
      <h1 className="heading">Dynamic list of posts</h1>
      {!isLoaded
        ? (
          <Start />
        )
        : (
          <PostList posts={posts} />
        )}
    </div>
  );
};

export default App;
