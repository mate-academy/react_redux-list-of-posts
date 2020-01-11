import React from 'react';
import { connect } from 'react-redux';
import { DebounceInput as SearchInput } from 'react-debounce-input';
import PropTypes from 'prop-types';
import PostList from './PostList';
import { loadPostsFromServer } from './store/posts';
import './App.css';
import { getSearchQuery, getPosts, getIsLoading } from './store';
import { setSearchQuery } from './store/searchQuery';

const App = (
  { posts, isLoading, searchQuery,
    // eslint-disable-next-line no-shadow
    setSearchQuery, loadPostsFromServer }
) => {
  const loadPosts = async() => {
    await loadPostsFromServer();
  };

  const filterPosts = (e) => {
    setSearchQuery(e.target.value.trim().toLowerCase());
  };

  const getFilteredPosts = () => posts.filter(
    post => (post.title + post.body).toLowerCase().includes(searchQuery),
  );

  return (
    <>
      {posts.length > 0 ? (
        <div className="post">
          <h1 className="title">
            Dynamic list of posts
          </h1>
          <SearchInput
            className="post__search"
            debounceTimeout={500}
            placeholder="Type to search..."
            onChange={filterPosts}
          />
          <PostList posts={getFilteredPosts()} />
        </div>
      ) : (
        <div className="post__start">
          <button
            disabled={isLoading}
            className="post__button"
            type="button"
            onClick={loadPosts}
          >
            {isLoading ? 'Loading...' : 'Load Posts'}
          </button>
        </div>
      )}
    </>
  );
};

const mapStateToProps = state => ({
  posts: getPosts(state),
  searchQuery: getSearchQuery(state),
  isLoading: getIsLoading(state),
});

export default connect(mapStateToProps, {
  setSearchQuery, loadPostsFromServer,
})(App);

App.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoading: PropTypes.bool.isRequired,
  searchQuery: PropTypes.string.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  loadPostsFromServer: PropTypes.func.isRequired,
};
