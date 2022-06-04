import React from 'react';
import './App.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelect } from './components/UserSelect';

const App: React.FC = () => (
  <div className="App">
    <header className="App__header">
      <UserSelect />
    </header>

    <main className="App__main">
      <div className="App__sidebar">
        <PostsList />
      </div>

      <div className="App__content">
        <PostDetails />
      </div>
    </main>
  </div>
);

export default App;
