import React, { useEffect } from 'react';
import './styles/general.scss';
import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import { PostsList } from './components/PostsList/PostsList';
import {
  getPostIdSelector,
  getPostsSelector,
  getUserIdSelector,
  getUsersSelector,
} from './store/selectors';
import { getUsers } from './api/users';
import { changeUserIdAction, loadUsersAction } from './store/actions';
import { PostDetails } from './components/PostDetails/PostDetails';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const userId = useSelector(getUserIdSelector);
  const users = useSelector(getUsersSelector);
  const postId = useSelector(getPostIdSelector);
  const posts = useSelector(getPostsSelector);

  useEffect(() => {
    const loadUsersFromServer = async () => {
      const usersFromServer = await getUsers();

      dispatch(loadUsersAction(usersFromServer));
    };

    loadUsersFromServer();
  }, []);

  return (
    <div className="App">
      <header className="App__header">
        <label htmlFor="user-selector">
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            id="user-selector"
            value={userId}
            onChange={(event) => {
              dispatch(changeUserIdAction(+event.target.value));
            }}
          >
            <option value="0">All users</option>
            {users.map((user) => (
              <option value={user.id} key={user.id}>{user.name}</option>
            ))}
          </select>
        </label>
      </header>
      <main className="App__main">
        <div className="App__sidebar">
          <PostsList postId={postId} posts={posts} userId={userId} />
        </div>
        <div className="App__content">
          <PostDetails postId={postId} posts={posts} />
        </div>
      </main>
    </div>
  );
};

export default App;
