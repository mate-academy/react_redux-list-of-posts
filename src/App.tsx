import React, { useEffect, useState } from 'react';
import './App.scss';
import './styles/general.scss';
import { useDispatch, useSelector } from 'react-redux';
import { User } from './react-app-env';
import { getUserPosts } from './helpers/post';
import { getUsers } from './helpers/users';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { setPostsAction } from './store/index';
import { getVisiblePosts } from './store/selectors';

const App: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUserId, setSelectedUserId] = useState(0);
  const [selectedPostId, setSelectedPostId] = useState(0);

  const dispatch = useDispatch();

  useEffect(() => {
    getUserPosts(selectedUserId)
      .then(postsFromServer => dispatch(setPostsAction(postsFromServer)));

    getUsers()
      .then(usersFromServer => setUsers(usersFromServer));
  }, []);

  const setPostId = (postId: number) => {
    setSelectedPostId(postId);
  };

  const visiblePosts = useSelector(getVisiblePosts(selectedUserId));

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
            <option value="0">All users</option>
            {users.map(user => (
              <option
                value={user.id}
                key={user.id}
              >
                {user.name}
              </option>
            ))}
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList
            posts={visiblePosts}
            selectPostId={selectedPostId}
            onSelectedPostId={setPostId}
          />
        </div>

        {selectedPostId !== 0 && (
          <div className="App__content">
            <PostDetails selectedPostId={selectedPostId} />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
