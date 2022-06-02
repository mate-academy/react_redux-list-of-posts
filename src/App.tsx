import { useEffect, useState, ChangeEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUserPosts } from './api/posts';

import './App.scss';
import './styles/general.scss';

import { PostsList } from './components/PostList/PostList';
import { PostDetails } from './components/PostDetails/PostDetails';
import { selectors, actions } from './store/main';

const App = () => {
  const selectedPostId = useSelector(selectors.getPostIdSelector);
  const [userId, setUserId] = useState(0);

  const dispath = useDispatch();

  useEffect(() => {
    async function result() {
      const postFromServer = await getUserPosts(userId);

      dispath(actions.loadPosts(postFromServer));
    }

    result();
  }, [userId]);

  const selectUser = (event: ChangeEvent<HTMLSelectElement>) => {
    const { value } = event.target;

    setUserId(+value);
  };

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            onChange={selectUser}
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

        <div className="App__content">
          {selectedPostId && <PostDetails />}
        </div>
      </main>
    </div>
  );
};

export default App;
