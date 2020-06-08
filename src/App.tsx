import React, { useState, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './App.scss';
import debounce from 'lodash.debounce';
import Loading from './components/Loading/Loading';
import PostList from './components/PostList/PostList';
import {
  loadPosts, getLoaded, getVisiblePosts,
  getLoading, getMessage, getPosts, getQuery,
} from './store/index';

import { setQuery } from './store/search';

const App = () => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getLoading);
  const errorMessage = useSelector(getMessage);
  const posts = useSelector(getPosts);
  const isLoaded = useSelector(getLoaded);
  const query = useSelector(getQuery);
  const visiblePosts = useSelector(getVisiblePosts);
  const [visibleQuery, setVisibleQuery] = useState(query);

  const setVisibleQueryWithDebounce = useCallback(
    debounce((actualQuery: string) => dispatch(setQuery(actualQuery)), 500), [],
  );

  const handleOnChange = (e: React.FormEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;

    setVisibleQuery(value);
    setVisibleQueryWithDebounce(value);
  };

  return (
    <>
      <div className="App">
        <h1>Dynamic list of posts</h1>

        {(!isLoading && posts.length === 0) && (
          <button
            type="button"
            className="App__LoadButton"
            onClick={() => dispatch(loadPosts())}
          >
            Load
          </button>
        )}

        {isLoading && (
          <Loading
            isLoaded={isLoaded}
            errorMessage={errorMessage}
          />
        )}

        {isLoaded && (
          <>
            <label
              htmlFor="inputFilter"
              className="Label"
            >
              <input
                type="text"
                id="inputFilter"
                className="InputFilter"
                value={visibleQuery}
                onChange={handleOnChange}
              />
            </label>
            <PostList posts={visiblePosts} />
          </>
        )}
        {errorMessage
          && (
            <div className="is-error">
              <p className="is-error__text">
                {errorMessage}
              </p>
              <button
                type="button"
                className="App__LoadButton"
                onClick={() => dispatch(loadPosts())}
              >
                Load
              </button>
            </div>
          )}
      </div>
    </>
  );
};

export default App;
