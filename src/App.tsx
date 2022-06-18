import { useDispatch, useSelector } from 'react-redux';
import { Loader } from './components/Loader';
import './styles/general.scss';
import './App.scss';
import { Start } from './components/Start/Start';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import {
  isLoading,
  getPosts,
  getUsers,
  loadPosts,
  getPostId,
  getUserId,
} from './store';
import { setUserId } from './store/userId';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const loading = useSelector(isLoading);
  const posts = useSelector(getPosts);
  const users: Users[] = useSelector(getUsers);
  const postId = useSelector(getPostId);
  const userId = useSelector(getUserId);

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setUserId(+event.target.value));
    dispatch(loadPosts(+event.target.value));
  };

  return (
    <div className="App">
      {(posts.length === 0 && userId === 0)
        ? (
          <Start />
        )
        : (
          <>
            <header className="App__header">
              <label>
                Select a user: &nbsp;

                <select
                  className="App__user-selector"
                  onChange={handleSelectChange}
                >
                  <option value="0">All users</option>
                  {users.map(user => (
                    <option
                      key={user.id}
                      value={user.id}
                    >
                      {user.name}
                    </option>
                  ))}
                </select>
              </label>
            </header>

            <main className="App__main">
              <div className="App__sidebar">
                {loading && <Loader />}
                <PostsList />
              </div>

              <div className="App__content">
                <h2>Post details:</h2>

                {loading && <Loader />}

                {postId !== 0
                  ? (
                    <PostDetails />
                  )
                  : (
                    <div className="App__sidebar--message">
                      <p>Choose a post to see a detail</p>
                    </div>
                  )}
              </div>
            </main>
          </>
        )}
    </div>
  );
};

export default App;
