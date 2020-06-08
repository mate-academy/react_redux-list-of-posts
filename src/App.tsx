import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.scss';
import PostList from './PostList';
import {
  getVisiblePosts,
  getIsLoading,
  getError,
  setQuery,
  loadPosts,
  getQuery,
} from './store';

const App = () => {
  const dispatch = useDispatch();
  const visiblePosts = useSelector(getVisiblePosts);
  const isLoading = useSelector(getIsLoading);
  const errorMessage = useSelector(getError);
  const query = useSelector(getQuery);

  const searchQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target as HTMLInputElement;

    dispatch(setQuery(value));
  };

  return (
    <div className="App">
      <h1>Dynamic list of posts</h1>
      {!visiblePosts.length ? (
        <>
          <button
            type="button"
            className="button"
            onClick={() => dispatch(loadPosts())}
          >
            {isLoading ? 'Loading...' : 'Click to Load'}
          </button>
          {errorMessage && <p className="error">{errorMessage}</p>}
        </>
      ) : (
        <>
          <input
            type="text"
            className="input"
            placeholder="what you search"
            value={query}
            onChange={searchQuery}
          />
          <PostList posts={visiblePosts} />
        </>
      )}
    </div>
  );
};

export default App;
