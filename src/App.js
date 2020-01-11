import React from 'react';
import './App.css';
import PostList from './components/PostList';

const App = () => (
  <div className="App">
    <h1>Dynamic list of posts</h1>
    <PostList />
  </div>
);

export default App;
