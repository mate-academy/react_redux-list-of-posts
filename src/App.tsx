import React from 'react';
import { useSelector } from 'react-redux';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { UserSelect } from './components/UserSelect/UserSelect';

const App: React.FC = () => {
  const { selectedPost } = useSelector(({ selectPost }: any) => selectPost);

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
          {selectedPost
            ? <PostDetails />
            : 'Post not selected'}
        </div>
      </main>
    </div>
  );
};

export default App;
