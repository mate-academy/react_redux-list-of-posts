import React from 'react';
import './App.scss';
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
      <PostsList />
    </div>
  );
};

export default App;
