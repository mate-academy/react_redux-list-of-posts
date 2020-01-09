import React, { useState } from 'react';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import { connect } from 'react-redux';
import { Input } from 'semantic-ui-react';
import { handleSearch, loadPosts } from './redux/store';
import './App.css';

import PostList from './components/PostList';

const App = (props) => {
  const { isLoading, postsList, mixedPosts } = props;
  const [inputValue, setInputValue] = useState('');

  const loadData = async() => {
    await props.loadPosts();
  };

  const searchPosts = debounce(query => props.handleSearch(query), 500);

  const searching = ({ target }) => {
    const value = target.value.toLowerCase().slice(0, 37);

    setInputValue(value);
    searchPosts(value);
  };

  return (
    <div>
      <h1 className="header">Dynamic list of posts</h1>

      {isLoading ? (
        <>
          <Input
            type="search"
            icon="search"
            placeholder="Search..."
            onChange={searching}
            value={inputValue}
            className="search-panel"
          />

          <PostList
            posts={mixedPosts || postsList}
            searchedResult={inputValue}
          />
        </>
      ) : (
        <>
          <button
            type="button"
            onClick={loadData}
          >
            {isLoading ? 'Loading...' : 'Load'}
          </button>
        </>
      )}
    </div>
  );
};

const mapStateToProps = state => ({
  postsList: state.postsList,
  mixedPosts: state.mixedPosts,
  isLoading: state.isLoading,
});

App.propTypes = {
  handleSearch: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  postsList: PropTypes.arrayOf(PropTypes.object).isRequired,
  mixedPosts: PropTypes.arrayOf(PropTypes.object).isRequired,
  loadPosts: PropTypes.func.isRequired,
};

export default connect(
  mapStateToProps,
  {
    loadPosts,
    handleSearch,
  }
)(App);
