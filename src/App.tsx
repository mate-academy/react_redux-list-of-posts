import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { useDispatch, useSelector } from 'react-redux';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getCurrentPostIdSelector, getUsersSelector } from './store/selectors';
import { getUserPosts, getUsers } from './api/api';
import { setPosts, setUsers } from './store';

const App: React.FC = () => {
  const [currentUserId, setCurrentUser] = useState('0');

  const dispatch = useDispatch();

  const users = useSelector(getUsersSelector);
  const currentPostId = useSelector(getCurrentPostIdSelector);

  useEffect(() => {
    const loadUsersFromServer = async () => {
      const usersFromServer = await getUsers();

      dispatch(setUsers(usersFromServer));
    };

    loadUsersFromServer();
  }, []);

  useEffect(() => {
    const loadUserPosts = async () => {
      const postsFromServer = await getUserPosts(currentUserId);

      dispatch(setPosts(postsFromServer));
    };

    loadUserPosts();
  }, [currentUserId]);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            onChange={(event) => {
              setCurrentUser(event.target.value);
            }}
          >
            <option value="0">All users</option>
            {users.slice(0, 10).map(user => (
              <option key={user.id} value={user.id}>{user.name}</option>
            ))}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList />
        </div>

        {currentPostId && (
          <div className="App__content">
            <PostDetails />
          </div>
        )}

      </main>
    </div>
  );
};

export default App;
