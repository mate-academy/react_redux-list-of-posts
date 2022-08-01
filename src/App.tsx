import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUsers } from './api/users';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { setSelectedUserId, setUsersAction } from './store';
import { getSelectedPostId, getUsersSelector } from './store/selectors';
import './App.scss';
import './styles/general.scss';

const App: React.FC = () => {
  const users = useSelector(getUsersSelector);
  const selectedPostId = useSelector(getSelectedPostId);
  const dispatch = useDispatch();

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const usersFromServer = await getUsers();

        dispatch(setUsersAction(usersFromServer));
      } catch (error) {
        // eslint-disable-next-line no-console
        console.log(error);
      }
    };

    loadUsers();
  }, []);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;
          <select
            className="App__user-selector"
            onChange={(event) => {
              dispatch(setSelectedUserId(+event.target.value));
            }}
          >
            <option value="0">All users</option>
            {users.map(user => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList />
        </div>

        {selectedPostId !== 0 && (
          <div className="App__content">
            <PostDetails />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
