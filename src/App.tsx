/* eslint-disable no-console */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.scss';
import './styles/general.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUsersFromServer } from './api/users';
import { setSelectedUserId, setUsers } from './store';
import { getUsersSelector } from './store/selectors';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const users = useSelector(getUsersSelector);

  useEffect(() => {
    const loadUsersFromServer = async () => {
      try {
        const usersFromServer = await getUsersFromServer();

        dispatch(setUsers(usersFromServer));
      } catch (error) {
        console.log(error);
      }
    };

    loadUsersFromServer();
  }, []);

  const selectHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSelectedUserId(+event.target.value));
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            onChange={selectHandler}
            className="App__user-selector"
          >
            <option value="0">All users</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </label>
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
};

export default App;
