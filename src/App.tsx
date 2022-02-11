import React from 'react';
import './App.scss';
import { PostsList } from './components/PostsList';
import { Header } from './components/Header';
import { PostDetails } from './components/PostDetails';

const App: React.FC = () => {
  return (
    <div className="App">
      <Header />

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
};

export default App;
