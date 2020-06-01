import React from 'react';
import './App.scss';
import PostList from './components/PostList';

const App = () => {

  return (
    <div className="App">
      <h1>Redux list of posts</h1>
      <PostList />
    </div>
  );
};

export default App;
