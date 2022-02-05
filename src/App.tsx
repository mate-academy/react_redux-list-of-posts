import './App.scss';
import './styles/general.scss';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PostsList } from './components/PostsList';
import { selectUserIdAction, State } from './store';
import { getPosts, getUsers } from './api/posts';
import { PostDetails } from './components/PostDetails';
// import { PostDetails } from './components/PostDetails';
// import { getPosts, getUsers } from './api/posts';
// import { User } from './types/User';
// import { Post } from './types/Post';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state: State) => state.posts);
  const users = useSelector((state: State) => state.users);
  const selectedUserId = useSelector((state: State) => state.selectedUserId);
  const selectedPostId = useSelector((state: State) => state.selectedPostId);
  const [isStart, setIsStart] = useState(false);

  // eslint-disable-next-line no-console
  console.log(posts, users);

  return (isStart ? (
    <div className="App">
      <header className="App__header">
        <label htmlFor="select">
          Select a user: &nbsp;

          <select
            id="select"
            className="App__user-selector"
            onChange={(event) => {
              dispatch(selectUserIdAction(+event.target.value));
              dispatch(getPosts(selectedUserId));
            }}
          >
            <option value={0}>All users</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>{`${user.name} ${user.username}`}</option>
            ))}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            posts={posts}
            selectedPostId={selectedPostId}
          />
        </div>

        <div className="App__content">
          {selectedPostId !== 0 && (
            <PostDetails selectedPostId={selectedPostId} />
          )}
        </div>
      </main>
    </div>
  ) : (
    <button
      className="start__button"
      type="button"
      onClick={() => {
        setIsStart(true);
        dispatch(getPosts(selectedUserId));
        dispatch(getUsers());
      }}
    >
      Start
    </button>
  ));
};

export default App;
