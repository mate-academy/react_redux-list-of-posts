import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect, useCallback } from 'react';
import debounce from 'lodash/debounce';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { actions, selectors } from './store';
import { setQuery } from './store/query';
import { usersActions } from './store/users';
import { setUserId } from './store/userId';
import { setPostId } from './store/postId';
import './App.scss';
import './styles/general.scss';

const App: React.FC = () => {
  const [isOpenDetails, setIsOpenDetails] = useState(false);
  const [visibleQuery, setVisibleQuery] = useState('');

  const dispatch = useDispatch();

  const query = useSelector(selectors.getQuery);
  const users = useSelector(selectors.getUsers);
  const userId = useSelector(selectors.getUserId);
  const postId = useSelector(selectors.getPostId);

  useEffect(() => {
    dispatch(usersActions.loadUsers());
  }, []);

  useEffect(() => {
    dispatch(actions.loadPosts(userId));
  }, [userId]);

  const applyQuery = useCallback(debounce((val: string) => {
    dispatch(setQuery(val));
  }, 1000), [query]);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            value={userId}
            onChange={({ target }) => {
              dispatch(setUserId(+target.value));
              dispatch(setPostId(0));
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
        <label>
          Filter posts: &nbsp;
          <input
            type="text"
            className="App__user-input"
            value={visibleQuery}
            onChange={({ target }) => {
              setVisibleQuery(target.value);
              applyQuery(target.value);
            }}
          />
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
