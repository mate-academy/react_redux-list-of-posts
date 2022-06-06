import {
  FC,
  useCallback,
  useEffect,
  ChangeEvent,
} from 'react';
import { useDispatch } from 'react-redux';

import './App.scss';
import './styles/general.scss';
import { loadPosts, loadUserPosts } from './store/reducers/ActionCreators';
import { Loader } from './components/Loader';
import { PostList } from './components/PostList';
import { PostDetails } from './components/PostDetails';
import { useAppSelector } from './store/hooks/redux';
import { postsSlice } from './store/reducers/PostSlice';

const App: FC = () => {
  const dispatch = useDispatch();
  const {
    posts, isPostsLoading, isPostDetailLoading, currentPostId, currentUserId,
  } = useAppSelector(state => state.postsReducer);

  const { selectUser } = postsSlice.actions;

  useEffect(() => {
    dispatch(loadPosts());
  }, []);

  const handleChange = useCallback((event: ChangeEvent<HTMLSelectElement>) => {
    const value = +event.target.value;

    dispatch(selectUser(value));

    return value === 0
      ? dispatch(loadPosts())
      : dispatch(loadUserPosts(value));
  }, [currentUserId]);

  return (
    <div className="App">
      <header className="App__header">
        <label>
          Select a user: &nbsp;

          <select
            className="App__user-selector"
            value={currentUserId}
            onChange={handleChange}
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
          {isPostsLoading && <Loader />}

          {!isPostsLoading && (posts.length ? <PostList /> : 'No posts yet')}
        </div>

        <div className="App__content">
          {isPostDetailLoading && <Loader />}

          {!!currentPostId && <PostDetails />}
        </div>
      </main>
    </div>
  );
};

export default App;
