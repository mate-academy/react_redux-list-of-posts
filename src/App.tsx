import React from 'react';
import './App.scss';
import { PostDetails } from './components/PostDetails';
import { PostsList } from './components/PostsList';
import { UserSelect } from './components/UserSelect';
import { useTypedSelector } from './hooks/useTypedSelector';

const App: React.FC = () => {
  const { selectedPostId } = useTypedSelector(state => state.post);

  return (
    <div className="App">
      <header className="App__header">
        <UserSelect />
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList />
        </div>

        <div className="App__content">
          {selectedPostId
            ? <PostDetails />
            : <p>Select a post</p>}
        </div>
      </main>
    </div>
  );
};

export default App;
