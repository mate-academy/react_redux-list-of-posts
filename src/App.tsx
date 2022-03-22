import React from 'react';
import { PostList } from './components/PostList';
import './styles/general.scss';
import './App.scss';
import { UserSelector } from './components/UserSelector';
import { PostDetails } from './components/PostDetails';

const App: React.FC = () => {
  return (
    <div className="App">

      <main className="App__main">
        <div className="App__sidebar">
          <UserSelector />
          <PostList />
        </div>

        <div className="App__content">
          <PostDetails />
        </div>
      </main>
    </div>
  );
};

export default App;
