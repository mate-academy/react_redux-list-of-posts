import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import * as functions from '../reducers/store';
import Post from './Post';
import { loadPosts } from '../reducers/PostsReducer';
import { changeQuery } from '../reducers/FilterReducer';

const PostList = ({
  posts,
  isLoading,
  postsLoaded,
  loadingError,
  setQuery,
  getPosts,
}) => {
  const debouncedInputHandler = _.debounce(setQuery, 500);

  return (
    <div>
      {posts.length === 0 && !loadingError && !isLoading
        && (
          <button
            className="load"
            type="button"
            onClick={getPosts}
          >
            Load
          </button>
        )
      }
      {isLoading && !loadingError && <div className="loading">Loading...</div>}
      {postsLoaded && !isLoading && (
        <div>
          <label htmlFor="search">
            Search
            <input
              id="search"
              className="input"
              type="search"
              onChange={inputEvent => debouncedInputHandler(
                inputEvent.target.value
              )}
            />
          </label>
          {posts.map(post => (
            <Post post={post} key={post.id} />
          ))}
        </div>
      )}
      {loadingError && (
        <div className="button_container">
          <p className="error">Error occurred</p>
          <button
            className="load"
            type="button"
            onClick={getPosts}
          >
            Try again
          </button>
        </div>
      )}
    </div>
  );
};

const getExtraData = state => ({
  posts: functions.getPosts(state),
  isLoading: functions.getLoading(state.loading),
  postsLoaded: functions.getLoaded(state.loaded),
  loadingError: functions.getError(state.error),
});

const getExtraMethods = dispatch => ({
  getPosts: value => dispatch(loadPosts(value)),
  setQuery: value => dispatch(changeQuery(value)),
});

PostList.propTypes = {
  posts: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  isLoading: PropTypes.bool.isRequired,
  postsLoaded: PropTypes.bool.isRequired,
  loadingError: PropTypes.bool.isRequired,
  setQuery: PropTypes.func.isRequired,
  getPosts: PropTypes.func.isRequired,
};

export default connect(getExtraData, getExtraMethods)(PostList);
