import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from './redux/store';
import { setPosts } from './redux/actions/posts';
import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';
import { getUserPosts } from './helpers/api';
import './App.scss';
import './styles/general.scss';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const selectedPostId = useSelector(({ posts }: RootState) => (
    posts.activePost
  ));
  const [selectedUser, setSelectedUser] = useState(0);

  useEffect(() => {
    getUserPosts(selectedUser)
      .then(data => dispatch(setPosts(data)));
  }, [selectedUser]);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            value={selectedUser}
            onChange={(e) => setSelectedUser(+e.target.value)}
          >
            <option value="0">All users</option>
            <option value="1">Leanne Graham</option>
            <option value="2">Ervin Howell</option>
            <option value="3">Clementine Bauch</option>
            <option value="4">Patricia Lebsack</option>
            <option value="5">Chelsey Dietrich</option>
            <option value="6">Mrs. Dennis Schulist</option>
            <option value="7">Kurtis Weissnat</option>
            <option value="8">Nicholas Runolfsdottir V</option>
            <option value="9">Glenna Reichert</option>
            <option value="10">Leanne Graham</option>
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList />
        </div>

        {selectedPostId !== null && (
          <div className="App__content">
            <PostDetails />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
