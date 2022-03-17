import React from 'react';
import './App.scss';
import { PostInfo } from './components/PostInfo';
import { PostsList } from './components/PostsList';
import { Search } from './components/Search';
import { BasicSelect } from './components/Select';

const App: React.FC = () => {
  return (
    <div className="App">
      <div className="App__top-bar">
        <BasicSelect />
        <Search />
      </div>
      <div className="App__content">
        <PostsList />
        <PostInfo />
      </div>
    </div>
  );
};

export default App;
