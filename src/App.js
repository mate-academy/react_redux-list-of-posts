import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DebounceInput } from 'react-debounce-input';
import {
  getLoading,
  getError,
  getInitialized,
  getPostsFromServer,
} from './redux/store';
import { setQuery } from './redux/queryReducer';
import PostList from './PostList';
import './App.css';

const App = ({ isLoading, hasError, isInitialized,
  setQuery, getPostsFromServer }) => {
  const handleSearchingInputChange = ({ target: { value } }) => {
    setQuery(value.toLowerCase().trim());
  };

  return (
    <div className="App">
      {isInitialized && (
        <DebounceInput
          debounceTimeout={500}
          type="text"
          placeholder="Search"
          className="posts__search"
          onChange={handleSearchingInputChange}
        />
      )}

      {!isInitialized && !hasError && (
        <button
          className="load-button"
          type="button"
          disabled={isLoading}
          onClick={getPostsFromServer}
        >
          {isLoading ? 'Loading...' : 'Load posts'}
        </button>
      )}
      {!isInitialized && hasError && (
        <button
          className="load-button"
          type="button"
          disabled={isLoading}
          onClick={getPostsFromServer}
        >
          {isLoading ? 'Loading...' : 'Try again'}
        </button>
      )}
      { isInitialized && (
        <PostList />
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  isLoading: getLoading(state),
  hasError: getError(state),
  isInitialized: getInitialized(state),
});

const mapDispatchToProps = {
  setQuery,
  getPostsFromServer,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

App.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  isInitialized: PropTypes.bool.isRequired,
  setQuery: PropTypes.func.isRequired,
  getPostsFromServer: PropTypes.func.isRequired,
};
