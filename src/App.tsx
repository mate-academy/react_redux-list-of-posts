import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './App.scss';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUsers } from './helpers/user';
import { setUserSelector } from './store/selectors';
import { getUsersAction } from './store';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const users = useSelector(setUserSelector);

  const [userSelect, setUserSelect] = useState('0');
  const [postId, setPostId] = useState(0);

  useEffect(() => {
    getUsers()
      .then(usersFromServer => dispatch(getUsersAction(usersFromServer)));
  }, []);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            value={userSelect}
            onChange={(event) => setUserSelect(event.target.value)}
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
            userSelect={userSelect}
            setPostId={setPostId}
          />
        </div>

        <div className="App__content">
          {postId !== 0
            ? (
              <PostDetails postId={postId} />
            )
            : (
              <p>No selected post</p>
            )}
        </div>
      </main>
    </div>
  );
};

export default App;
