import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import debounce from 'lodash.debounce';
import { getAppData } from './helpers/api';
import PostList from './components/PostList';

import './App.scss';
import {
  startLoading,
  initPosts,
  getPosts,
  isLoading,
  handleError,
  hasError,
  getQuery,
  setQuery,
  setFilterQuery,
} from './store';

const App = () => {
  const dispatch = useDispatch();
  const posts = useSelector(getPosts);
  const loading = useSelector(isLoading);
  const errorMessage = useSelector(hasError);
  const query = useSelector(getQuery);

  const handleGetPosts = () => {
    dispatch(startLoading());
    getAppData()
      .then(postsFromServer => {
        dispatch(initPosts(postsFromServer));
      })
      .catch(event => {
        dispatch(handleError(event.message));
      });
  };

  const setFilterQueryWithDebounce = useCallback(
    debounce((value: string) => dispatch(setFilterQuery(value)), 200),
    [],
  );

  const handleSetQuery = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    dispatch(setQuery(value));
    setFilterQueryWithDebounce(value);
  };

  return (
    <div className="post">
      <h1 className="post__header">Redux list of posts</h1>
      {posts.length === 0 ? (
        <button className="button" type="button" onClick={handleGetPosts}>
          {loading ? 'Loading...' : 'Load'}
        </button>
      ) : (
        <>
          <div className="search">
            <label htmlFor="search">
              <input
                className="search__form"
                placeholder="filter posts"
                type="text"
                id="search"
                value={query}
                onChange={handleSetQuery}
              />
            </label>
          </div>
          <PostList />
        </>
      )}
      {errorMessage && (
        <p className="post__error">
          {`Error: ${errorMessage}`}
        </p>
      )}
    </div>
  );
};

export default App;
