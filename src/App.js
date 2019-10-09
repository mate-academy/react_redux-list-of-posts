import React from 'react';
import PropTypes from 'prop-types';
import EnhancedPostList from './components/PostList/PostListHandle';

import './App.css';

const App = ({
  receivePosts,
  isLoading,
  hasError,
  isInitialized,
  addTextForFilter,
  templateForFilter,
  sortPosts,
  resetFilter,
}) => (
  <>
    {
      (!isLoading && isInitialized && (
        <div className="app">
          <h1 className="app__title">Static list of posts</h1>
          <form onSubmit={event => sortPosts(event)}>
            <input
              onChange={event => addTextForFilter(event.target.value)}
              value={templateForFilter}
              type="text"
              className="text-template"
            />
          </form>
          <button
            onClick={resetFilter}
            type="button"
            className="button_reset btn btn-primary load"
          >
            Reset
          </button>
          <EnhancedPostList />
        </div>
      ))
      || (isLoading && <p className="loading">Loading...</p>)
      || (hasError && (
        <>
          <h1 className="app__title">You want to upload again.</h1>
          <button
            type="button"
            className="btn btn-warning load load-again"
            onClick={receivePosts}
          >
            Load again
          </button>
        </>
      ))
      || (!isInitialized && (
        <>
          <h1 className="app__title">Want to upload a list of posts?</h1>
          <button
            type="button"
            className="btn btn-primary load"
            onClick={receivePosts}
          >
            Load
          </button>
        </>
      ))
    }
  </>
);

App.propTypes = {
  receivePosts: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  isInitialized: PropTypes.bool.isRequired,
  addTextForFilter: PropTypes.func.isRequired,
  templateForFilter: PropTypes.string.isRequired,
  sortPosts: PropTypes.func.isRequired,
  resetFilter: PropTypes.func.isRequired,
};

export default App;
