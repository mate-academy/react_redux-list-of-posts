/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { useDispatch, useSelector } from 'react-redux';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUsers } from './api/users';
import { GET_USERS } from './store/usersReducer';
import { RootState } from './store';

const App: React.FC = () => {
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState(0);

  const dispatch = useDispatch();
  const users = useSelector((state: RootState) => state.users.users);

  useEffect(() => {
    getUsers()
      .then(usersFromServer => {
        dispatch({ type: GET_USERS, payload: usersFromServer });
      });
  }, [selectedUserId]);

  const addPostInfo = (postId: number) => {
    setSelectedPostId(postId);
  };

  const removePostInfo = () => {
    setSelectedPostId(0);
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;
          <select
            className="App__user-selector"
            value={selectedUserId}
            onChange={(event) => {
              setSelectedUserId(+event.target.value);
            }}
          >
            <option
              value="0"
            >
              All users
            </option>
            {users.map((user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            )))}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            userPosts={selectedUserId}
            onAdd={addPostInfo}
            onRemove={removePostInfo}
          />
        </div>

        <div className="App__content">
          {selectedPostId !== 0 ? (
            <PostDetails postId={selectedPostId} />
          ) : ('Please, select a post')}
        </div>
      </main>
    </div>
  );
};

export default App;
