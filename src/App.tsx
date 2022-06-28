import React, { useEffect } from 'react';
import './App.scss';
import './styles/general.scss';
import { useDispatch, useSelector } from 'react-redux';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getPosts, getUserPosts } from './api/post';
import { getUsers } from './api/users';
// eslint-disable-next-line max-len
import { getPostsSelector, getSelectedPostIdSelector, getUsersSelector } from './store/selectors';
import { setPosts, setUsers } from './store';

const App: React.FC = () => {
  const dispatch = useDispatch();

  const posts = useSelector(getPostsSelector);
  const users = useSelector(getUsersSelector);

  const selectedPostId = useSelector(getSelectedPostIdSelector);

  const requestPosts = async () => {
    try {
      const postsFromServer = await getPosts();

      dispatch(setPosts(postsFromServer));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  const requestUsers = async () => {
    try {
      const usersFromServer = await getUsers();

      dispatch(setUsers(usersFromServer.slice(0, 9)));
    } catch (error) {
      // eslint-disable-next-line no-console
      console.log(error);
    }
  };

  useEffect(() => {
    requestUsers();
    requestPosts();
  }, []);

  const handleSelect = async (event: React.ChangeEvent<HTMLSelectElement>) => {
    const userPost = await getUserPosts(+event.target.value);

    dispatch(setPosts(userPost));

    if (+event.target.value === 0) {
      requestPosts();
    }
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            onChange={handleSelect}
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
            posts={posts}
            onRequestPosts={requestPosts}
          />
        </div>

        <div className="App__content">
          {selectedPostId !== 0 && (
            <PostDetails />
          )}
        </div>
      </main>
    </div>
  );
};

export default App;
