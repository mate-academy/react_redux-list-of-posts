import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { selectPosts, selectIsLoading, selectIsSearchError, selectIsLoaded } from './store';
import { createActionLoadData } from './API/loadData';
import { createActionSetQuery } from './store/query';

import './App.scss';
import PostList from './components/PostList';

const App = ({ loadData, isLoading, posts, setQuery, isLoaded }) => (
  <main className="list">
    <h1>Dynamic list of posts</h1>

    {isLoaded && (
      <section className="search-bar">
        <input
          type="text"
          placeholder="search post"
          className="input"
          onChange={event => setQuery(event.target.value.toLowerCase().trim())}
        />
      </section>
    )}

    {isLoading && (
      <button
        type="button"
        className="button button--non-active"
      >
        Loading
      </button>
    )}

    {!isLoading && !isLoaded && (
      <button
        className="button"
        type="button"
        onClick={loadData}
      >
        Load
      </button>
    )}

    {isLoaded && posts.length !== 0 && (
      <PostList />
    )}

    {isLoaded && posts.length === 0 && (
      <p className="warning">
        There are no such posts, please try another search combination
      </p>
    )}
  </main>
);

const mapStateToProps = state => ({
  posts: selectPosts(state),
  isLoading: selectIsLoading(state),
  isSearchError: selectIsSearchError(state),
  isLoaded: selectIsLoaded(state),
});

const mapDispatchToProps = {
  loadData: createActionLoadData,
  setQuery: createActionSetQuery,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

App.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  posts: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  loadData: PropTypes.func.isRequired,
  setQuery: PropTypes.func.isRequired,
  isLoaded: PropTypes.bool.isRequired,
};
