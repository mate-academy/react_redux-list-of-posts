import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { DebounceInput } from 'react-debounce-input';
import './App.css';
import { setQuery } from './reducers/queryReducer';
import {
  getLoading,
  getError,
  getInitialized,
  getPostsFromServer,
} from './store';
import PostList from './components/PostList';

const App = ({ isLoading, hasError, isInitialized,
  setQuery, getPostsFromServer }) => {
  const handleSearchingInputChange = ({ target }) => {
    setQuery(target.value.toLowerCase().trim());
  };

  return (
    <div className="App">
      {!isInitialized && !isLoading && !hasError && (
        <button
          type="button"
          className="btnLoad"
          onClick={getPostsFromServer}
        >
          Load
        </button>
      )}

      {isInitialized && (
        <>
          <DebounceInput
            debounceTimeout={500}
            type="text"
            placeholder="Search"
            className="search"
            onChange={handleSearchingInputChange}
          />
          <PostList />
        </>
      )}

      {hasError && (
        <button
          className="btnError"
          type="button"
          onClick={getPostsFromServer}
        >
          Error...Try again
        </button>
      )}

      {isLoading && !hasError && (
        <div className="hoja">Loading...</div>
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

App.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  isInitialized: PropTypes.bool.isRequired,
  setQuery: PropTypes.func.isRequired,
  getPostsFromServer: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
