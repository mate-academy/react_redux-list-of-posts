import React from 'react';
import { useSelector } from 'react-redux';
import PostList from './components/PostList';

import './App.scss';
import { Start } from './components/Start';

import { isLoading, isVisible } from './store';

const App = () => {
  const loading = useSelector(isLoading);
  const isHiddenButton = useSelector(isVisible);

  return (
    <div className="App">
      <h1>Redux list of posts</h1>
      {!isHiddenButton && <Start />}
     {loading ? 'Loading...' : <PostList />}
    </div>
  );
};

export default App;
