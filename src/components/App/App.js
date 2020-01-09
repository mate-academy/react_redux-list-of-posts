/* eslint-disable react/no-unused-state */
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import PostsList from '../PostsList/PostsList';

function App(props) {
  const {
    preparedPosts,
    loaded,
    isLoading,
    hasError,
    loadDatas,
  } = props;

  const [search, setSearch] = useState('');

  const filteredPosts = preparedPosts.filter(post => post.title
    .includes(search) || post.body.includes(search));

  if (isLoading) {
    return (
      <h1>Loading...</h1>
    );
  }

  if (hasError) {
    return (
      <>
        <p>Error occured!</p>
        <button type="button" onClick={loadDatas}>Try again</button>
      </>
    );
  }

  return (
    <div className="App">
      <h1>react -_redux_- posts</h1>
      {!loaded
        ? (
          <button
            onClick={loadDatas}
            className="button-start"
            type="button"
          >
              Load
          </button>
        )
        : (
          <input
            className="search-input"
            value={search}
            type="search"
            placeholder="Search post"
            onChange={e => setSearch(e.target.value)}
          />
        )
      }
      <PostsList posts={filteredPosts} />
    </div>
  );
}

App.propTypes = {
  preparedPosts: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      id: PropTypes.number,
    }).isRequired,
  ).isRequired,
  loadDatas: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  loaded: PropTypes.bool,
};

App.defaultProps = {
  loaded: false,
};

export default App;
