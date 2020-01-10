import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';

import './App.scss';
import { debounce } from '../../helpers/debounce';
import PostList from '../PostList';

const App = (
  {posts, isLoading, hasError, isLoaded, loadData, setQuery}
) => {
  const [highlightedValue, setHighlightedValue] = useState('');

  const applySearchWithDebounce = useCallback(
    debounce((value) => {
      setQuery(value);
    }, 500),
    []
  );

  const searchPosts = ({ target }) => {
    const value = target.value.toLowerCase()
      .replace(/[/\\+*()?[\]]/g, '');

    setHighlightedValue(value);
    applySearchWithDebounce(value);
  };

  return (
    <div className="App">
      <h1 className="main-title">Dynamic list of posts</h1>

      {isLoaded ? (
        <>
          <input
            type="search"
            className="posts-search"
            placeholder="Search for posts"
            onChange={searchPosts}
            value={highlightedValue}
          />

          <PostList
            posts={posts}
            highlightedValue={highlightedValue}
          />
        </>
      ) : (
        <>
          <h3 className="sub-title">
          {hasError ? 'Something went wrong ...' : 'No posts yet!'}
        </h3>

        <button
          className="load-btn"
          type="button"
          onClick={async() => {
            await loadData();
          }}
          disabled={isLoading}
        >
          {isLoading ? 'Loading ...' : 'Load posts'}
        </button>
        </>
      )}
    </div>
  );
};

App.propTypes = {
  posts: PropTypes.arrayOf(
    PropTypes.object
  ).isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  loadData: PropTypes.func.isRequired,
  setQuery: PropTypes.func.isRequired,
};

export default App;
