import './App.scss';
import './styles/general.scss';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { PostsList } from './components/PostsList';
import { selectUserIdAction, State } from './store';
import { getPosts, getUsers } from './api/posts';
import { PostDetails } from './components/PostDetails';

const App: React.FC = () => {
  const dispatch = useDispatch();

  const users = useSelector((state: State) => state.users);

  const selectedUserId = useSelector((state: State) => state.selectedUserId);

  const selectedPostId = useSelector((state: State) => state.selectedPostId);

  const [isStart, setIsStart] = useState(false);

  const selectUser = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(selectUserIdAction(+event.target.value));
  };

  const startApp = () => {
    setIsStart(true);
    dispatch(getPosts(0));
    dispatch(getUsers());
  };

  useEffect(() => {
    dispatch(getPosts(selectedUserId));
  }, [selectedUserId]);

  return (isStart ? (
    <div className="App">
      <header className="App__header">
        <label htmlFor="select">
          Select a user: &nbsp;

          <select
            id="select"
            className="App__user-selector"
            onChange={selectUser}
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
          <PostsList />
        </div>

        <div className="App__content">
          {selectedPostId !== 0 && (
            <PostDetails />
          )}
        </div>
      </main>
    </div>
  ) : (
    <button
      className="start__button"
      type="button"
      onClick={startApp}
    >
      Start
    </button>
  ));
};

export default App;
