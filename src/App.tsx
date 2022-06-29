import React, { useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { useDispatch, useSelector } from 'react-redux';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import {
  getCurrentUserSelector,
  getIsLoadingSelector,
  getUsersSelector,
} from './store/selectors';
import { Loader } from './components/Loader';
import { getAllUsers } from './api/api';
import {
  setCurrentUserAction,
  setIsLoadingAction,
  setUsersAction,
} from './store';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const users = useSelector(getUsersSelector);
  const currentUser = useSelector(getCurrentUserSelector);
  const isLoading = useSelector(getIsLoadingSelector);

  useEffect(() => {
    const loadUsersFromServer = async () => {
      const usersFromServer = await getAllUsers();

      dispatch(setUsersAction(usersFromServer));
    };

    loadUsersFromServer();
  }, []);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            value={currentUser}
            onChange={(event) => {
              dispatch(setCurrentUserAction(event.target.value));
              dispatch(setIsLoadingAction(true));
            }}
          >
            <option value="0" disabled>All users</option>
            {users.map(user => (
              <option
                key={user.id}
                value={`${user.id}`}
              >
                {user.name}
              </option>
            ))}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          {isLoading && <Loader />}
          <PostsList />
        </div>

        <div className="App__content">
          {currentUser !== '0' ? (
            <PostDetails />
          ) : (<p>Choose user!</p>)}
        </div>
      </main>
    </div>
  );
};

export default App;
