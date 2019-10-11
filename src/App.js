import React from 'react';
import PostList from './containers/PostListHandler';
import './App.css';

function App() {
  return (
    <div className="App">
      <h1>Redux list of posts</h1>
      <PostList />
    </div>
  );
}

export default App;
