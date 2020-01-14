import React from 'react';
import './App.css';
import PropTypes from 'prop-types';
import {
  getError,
  getLoading,
  getInitialized,
  getPostsFromServer,
  getPosts
} from './redux/store';
import { DebounceInput } from 'react-debounce-input';
import { connect } from 'react-redux';
import { setQuery } from'./redux/queryReducer';
import PostList from './PostList';

const App = ({
  isLoading,
  error,
  isInitialized,
  setQuery,
  getPostsFromServer,
  posts
}) => {
  const handleInputChange = ({ target: { value } }) => {
    setQuery(value.toLowerCase().trim());
  };
  return (
    <div className="App">
      {isInitialized && !isLoading && (
        <DebounceInput
          debounceTimeout={1000}
          className="input"
          type="search"
          placeholder="Search..."
          onChange={handleInputChange}
        />
      )}
      {!isInitialized && error && (
        <button
          type="button"
          className="button"
          disabled={isLoading}
          onClick={getPostsFromServer}
        >
          {isLoading ? "Loading..." : "Try again"}
        </button>
      )}
      {!isInitialized && !error && (
        <button
          type="button"
          disabled={isLoading}
          onClick={getPostsFromServer}
          className="button"
        >
          {isLoading ? "Loading..." : "Load"}
        </button>
      )}
      {!isLoading && isInitialized && posts.length === 0 && (
        <p> post is not found</p>
      )}
      {isInitialized && <PostList />}
    </div>
  );
};

const mapStateToProps = state => ({
  isLoading: getLoading(state),
  error: getError(state),
  isInitialized: getInitialized(state),
  posts: getPosts(state)
});

const mapDispatchToProps = {
  setQuery,
  getPostsFromServer
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

App.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  isInitialized: PropTypes.bool.isRequired,
  setQuery: PropTypes.func.isRequired,
  getPostsFromServer: PropTypes.func.isRequired
};
