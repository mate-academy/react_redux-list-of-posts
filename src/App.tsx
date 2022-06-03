import { FC } from 'react';
import { PostDetails } from './components/PostDetails';
import { PostsList } from './components/PostsList';
import { useAppSelector } from './typedHooks/hooks';
import { selectors } from './store/listOfPostsSlice';

import './App.scss';
import './styles/general.scss';

const App: FC<{}> = () => {
  const selectedPostId = useAppSelector(selectors.getSelectedPostId);

  return (
    <div className="App">
      <main className="App__main">
        <div className="App__sidebar">
          <PostsList />
        </div>
        {!!selectedPostId && (
          <div className="App__content">
            <PostDetails selectedPostId={selectedPostId} />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
