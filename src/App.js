import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './App.css';
import { debounce } from './debounce';
import {
  getPosts, getLoading, getLoaded, getFilter, loadPostsFromServer,
} from './store';
import { setFilterAC } from './filterReducer';
import PostList from './PostList';

const App = ({ posts, loading, loaded, filter, loadPosts, setFilter }) => {
  const filterPosts = debounce((input) => {
    setFilter(input);
  }, 500);

  const filteredPosts = posts
    .filter(post => (post.title + post.body).toLowerCase().includes(filter));

  return (
    <div className="App">
      <h1>React-Redux list of posts</h1>
      {!loaded
        ? (
          <button
            className="button--load"
            type="button"
            onClick={loadPosts}
          >
            {!loading
              ? 'Load list of posts'
              : 'Loading... Please wait...'}
          </button>
        )
        : (
          <PostList posts={filteredPosts} filterPosts={filterPosts} />
        )}

    </div>
  );
};

const mapStateToProps = state => ({
  posts: getPosts(state),
  loading: getLoading(state),
  loaded: getLoaded(state),
  filter: getFilter(state),
});

const mapDispatchtoProps = {
  setFilter: setFilterAC,
  loadPosts: loadPostsFromServer,
};

App.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  filter: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  loaded: PropTypes.bool.isRequired,
  setFilter: PropTypes.func.isRequired,
  loadPosts: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchtoProps)(App);
