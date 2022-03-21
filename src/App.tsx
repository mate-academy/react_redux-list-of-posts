import './App.scss';
import { PostDetails } from './components/PosrDetails/PostDetails';
import { PostsList } from './components/PostsList/PostsList';

const App = () => {
  return (
    <div className="App">
      <h1>Redux list of posts</h1>
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
