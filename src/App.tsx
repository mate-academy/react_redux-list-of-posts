import { FC } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './App.scss';

import { PostsList } from './components/PostsList';
import { PostDetails } from './components/PostDetails';

import { Loader } from './components/Loader';

import {
  getIsPostLoadingSelector,
  getSelectedPostSelector,
  getSelectValueSelector,
} from './store/PostsReducer/selectors';
import {
  loadUserAction,
} from './store/UserReducer/actions';

const App: FC = () => {
  const dispatch = useDispatch();

  const selectValue = useSelector(getSelectValueSelector);
  const selectedPost = useSelector(getSelectedPostSelector);
  const isPostLoading = useSelector(getIsPostLoadingSelector);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            value={selectValue}
            onChange={({ target }) => {
              dispatch(loadUserAction(target.value));
            }}
          >
            <option value="All users">
              All users
            </option>

            <option value="Leanne Graham">
              Leanne Graham
            </option>

            <option value="Ervin Howell">
              Ervin Howell
            </option>

            <option value="Clementine Bauch">
              Clementine Bauch
            </option>

            <option value="Patricia Lebsack">
              Patricia Lebsack
            </option>

            <option value="Chelsey Dietrich">
              Chelsey Dietrich
            </option>

            <option value="Mrs. Dennis Schulist">
              Mrs. Dennis Schulist
            </option>

            <option value="Kurtis Weissnat">
              Kurtis Weissnat
            </option>

            <option value="Nicholas Runolfsdottir V">
              Nicholas Runolfsdottir V
            </option>

            <option value="Glenna Reichert">
              Glenna Reichert
            </option>
          </select>
        </label>
      </header>

      <main className="App__main">
        <div className="App__sidebar">
          <PostsList />
        </div>

        {selectedPost && (
          <div className="App__content">
            <PostDetails />
          </div>
        )}

        {isPostLoading && (
          <div className="App__content">
            <Loader />
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
