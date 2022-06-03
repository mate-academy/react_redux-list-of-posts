import { FC } from 'react';
import { useSelector } from 'react-redux';

import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { PostListControlPanel } from './components/PostListControlPanel';

import { getSelectedPostSelector } from './store/PostsReducer/selectors';

const App: FC = () => {
  const selectedPost = useSelector(getSelectedPostSelector);

  return (
    <div className="App">
      <header className="App__header">
        <PostListControlPanel />
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList />
        </div>

        {selectedPost && (
          <div className="App__content">
            {selectedPost ? <PostDetails /> : 'Choose post'}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
