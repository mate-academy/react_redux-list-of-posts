import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from 'react';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { actions, selectors } from './store';
import './App.scss';
import './styles/general.scss';

const App: React.FC = () => {
  const [isOpenDetails, setIsOpenDetails] = useState(false);

  const dispatch = useDispatch();

  const users = useSelector(selectors.getUsers);
  const userId = useSelector(selectors.getUserId);
  const postId = useSelector(selectors.getPostId);

  useEffect(() => {
    dispatch(actions.loadUsers());
  }, []);

  useEffect(() => {
    dispatch(actions.loadPosts(userId));
  }, [userId]);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            value={userId}
            onChange={({ target }) => {
              dispatch(actions.setUserId(+target.value));
            }}
          >
            <option value="0">All users</option>
            {users && users.map(person => (
              <option
                key={person.id}
                value={person.id}
              >
                {person.name}
              </option>
            ))}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            setIsOpenDetails={setIsOpenDetails}
          />
        </div>

        <div className="App__content">
          {postId !== 0
            && (
              <PostDetails
                isClicked={isOpenDetails}
                setIsOpenDetails={setIsOpenDetails}
              />
            )}
        </div>
      </main>
    </div>
  );
};

export default App;
