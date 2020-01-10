import React from 'react';
import { connect } from 'react-redux';
import { DebounceInput as FilterInput } from 'react-debounce-input';
import PropTypes from 'prop-types';
import PostList from './PostList';
import { getPosts, getIsLoading, loadFromServer, getQuery } from './store';
import { setQuery } from './reducers/queryReducer';

import './App.css';

const App = ({
  posts, isLoading, load, query, setQueryValue,
}) => {
  const filtredPosts = posts.filter(
    ({ title, body }) => (
      (title + body).toLowerCase().includes(query.trim())
    ),
  );

  const handleInput = (e) => {
    setQueryValue(e.target.value);
  };

  return (
    <div className="App">
      <h1>Dynamic list of posts</h1>
      {posts.length
        ? (
          <>
            <FilterInput
              className="filter"
              type="text"
              value={query}
              onChange={handleInput}
              debounceTimeout={500}
            />
            <PostList info={filtredPosts} />
          </>
        )
        : (<button type="button" onClick={load}>Load data</button>)
      }
      {isLoading && <h3>Loading...</h3>}
    </div>
  );
};

App.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoading: PropTypes.bool.isRequired,
  load: PropTypes.func.isRequired,
  setQueryValue: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
};

const mapStateToProps = state => ({
  posts: getPosts(state),
  isLoading: getIsLoading(state),
  query: getQuery(state),
});

const mapMethodsToProps = {
  load: loadFromServer,
  setQueryValue: setQuery,
};

export default connect(mapStateToProps, mapMethodsToProps)(App);
