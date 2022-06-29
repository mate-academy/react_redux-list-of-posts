import { useSelector, useDispatch } from 'react-redux';

import { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { getUsersSelector } from './store/selectors';
import { getUsers } from './helpers/api';
import { setUsers } from './store';
import { PostsList } from './components/PostList/PostList';
import { PostDetails } from './components/PostDetails/PostDetails';

const App = () => {
  const dispatch = useDispatch();

  const users = useSelector(getUsersSelector);

  const [selectedUser, setSelectedUser] = useState('');
  const [selectedPostId, setSelectedPostId] = useState(0);

  const postIdhandler = (postId: number | null) => {
    if (postId) {
      setSelectedPostId(postId);
    } else {
      setSelectedPostId(0);
    }
  };

  useEffect(() => {
    const loadUsersFromServer = async () => {
      const usersFromServer = await getUsers();

      dispatch(setUsers(usersFromServer));
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
            onChange={event => setSelectedUser(event.target.value)}
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
          <PostsList
            userId={selectedUser}
            onPostIdHandler={postIdhandler}
            selectedPostId={selectedPostId}
          />
        </div>

        <div className="App__content">
          {selectedPostId ? (
            <PostDetails postId={selectedPostId} />
          ) : (
            <p>No selected posts</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
