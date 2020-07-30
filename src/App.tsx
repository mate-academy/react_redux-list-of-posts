import React, { FormEvent } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './App.scss';
import { PostList } from './components/PostList/PostList';
import { loadPostsWithUsers } from './helpers/api';

import
{
  finishLoading,
  startLoading,
  setSearch,
  isLoaded as loaded,
  isLoading as loading,
  getFilteredPosts,
} from './store/index';

const App: React.FC = () => {
  const dispatch = useDispatch();

  const isLoading = useSelector(loading);
  const isLoaded = useSelector(loaded);
  const posts = useSelector(getFilteredPosts);

  const handleButtonClick = async () => {
    dispatch(startLoading());

    await loadPostsWithUsers().then(data => {
      dispatch(finishLoading(data));
    });
  };

  const handleQuery = (event: FormEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;

    dispatch(setSearch(value));
  };

  return (
    <div className="App">
      <h1>React dynamic list of Posts</h1>
      <div>
        {!isLoaded ? (
          <>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleButtonClick}
              disabled={isLoading}
            >
              {isLoading ? 'loading...' : 'Load'}
            </button>
          </>
        ) : (
          <>
            <h2>
              Found
              &nbsp;
              {posts.length}
              &nbsp;
              posts
            </h2>
            <div>
              <input
                type="text"
                placeholder="search..."
                className="form-control form-control-lg"
                onChange={handleQuery}
              />
            </div>
            <div className="content">
              <PostList />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default App;
