import React from 'react';
import { useSelector } from 'react-redux';
import './App.scss';
import { Start } from './components/Start';
import { isLoading, getMessage, isVisible } from './store';
import PostList from './components/PostList/PostList';

const App = () => {
  const isLoad = useSelector(isLoading);
  const isVisibleContent = useSelector(isVisible);
  const message = useSelector(getMessage) || 'Ready!';

  return (
    <div className="App">
      <h1>Redux list of posts</h1>
      <h2>{isLoad ? 'Loading...' : message}</h2>
      {!isVisibleContent && <Start />}
      {isVisibleContent && <PostList />}
    </div>
  );
};

export default App;
