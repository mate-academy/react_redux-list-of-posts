import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAppData } from './helpers/api';
import PostList from './components/PostList';
import debounce from 'lodash.debounce';

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
        dispatch(initPosts(postsFromServer))
      })
      .catch(e => {
        dispatch(handleError(e.message))
      })
  }

  const setFilterQueryWithDebounce = useCallback(
    debounce((value: string) => dispatch(setFilterQuery(value)), 500),
    [],
  );

  const handleSetQuery = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    dispatch(setQuery(value));
    setFilterQueryWithDebounce(value);
  }

  return (
    <div className="post">
      <h1 className="post__header">Redux list of posts</h1>
      {loading
        ? (
          <div className="lds-ellipsis">
            <div />
            <div />
            <div />
            <div />
          </div>
        )
        :
        <>
          {posts.length === 0 &&
            <button
              type="button"
              className="post__button"
              onClick={handleGetPosts}
            >
              Load Posts
            </button>}

          {posts.length !== 0 && (
            <>
              <div className="post__search-field">
                <label htmlFor="search">
                  Filter Posts
                  <input
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
        </>
      }
    </div>
  );
};

export default App;
