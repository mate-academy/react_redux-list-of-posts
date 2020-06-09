import React, { useCallback, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.scss';
import debounce from 'lodash.debounce';
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
  const [inputQuery, setInputQuery] = useState(query);

  const queryWithDebounce = useCallback(
    debounce((value: string) => dispatch(setQuery(value)), 500), [],
  );

  const searchQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    setInputQuery(value);
    queryWithDebounce(value);
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
            value={inputQuery}
            onChange={searchQuery}
          />
          <PostList posts={visiblePosts} />
        </>
      )}
    </div>
  );
};

export default App;
