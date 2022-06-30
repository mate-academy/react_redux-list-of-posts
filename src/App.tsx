import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { request } from './api/api';
import './App.scss';
import { PostDetails } from './components/PostDetails/PostDetails';
import { PostList } from './components/PostList/PostList';
import { setAllUsersAction, setUserIdAction } from './store/actions';
import { getAllUsersSelector } from './store/selectors';

const App = () => {
  const dispatch = useDispatch();
  const users = useSelector(getAllUsersSelector);

  useEffect(() => {
    const fetcher = async () => {
      const result = await request('/users');

      dispatch(setAllUsersAction(result));
    };

    fetcher();
  }, []);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            onChange={(event) => {
              dispatch(setUserIdAction(Number(event.target.value)));
            }}
          >
            <option value="0">All users</option>
            {users.map(singleUser => (
              <option
                key={singleUser.id}
                value={singleUser.id}
              >
                {singleUser.name}
              </option>
            ))}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
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
