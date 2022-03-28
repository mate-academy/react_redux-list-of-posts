import React from 'react';
import './App.scss';
import { Posts } from './components/posts/Posts';
import { Post } from './components/post/Post';

export const App: React.FC = () => {
  return (
    <div className="main">
      <Posts />
      <Post />
    </div>
  );
};
