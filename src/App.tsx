import React from 'react';

import './App.scss';
import { PostInfo } from './components/PostInfo/PostInfo';
import { PostList } from './components/PostsList/PostList';

const App:React.FC = () => {
  return (
    <div className="App">
      <div className="leftSideBar">
        <PostList />
      </div>
      <div className="rightSideBar">
        <PostInfo />
      </div>
    </div>
  );
};

export default App;
