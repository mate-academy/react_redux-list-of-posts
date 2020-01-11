import React, { useState, useCallback } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import PostList from './PostList';
import './App.css';
import { getUsers, getComments, getPosts } from './api';
// eslint-disable-next-line import/no-duplicates
import * as actionCreators from './store';
// eslint-disable-next-line import/no-duplicates
import * as selectors from './store';

const App = ({
  startLoading,
  finishLoading,
  hideLoadingButton,
  setPosts,
  isLoading,
  loadingButton,
  countAllPosts,
  setQuerySelector,
  countVisiblePosts,
}) => {
  const [inputValue, setInputValue] = useState('');
  const handleLoading = async() => {
    startLoading();

    const [posts, comments, users] = await Promise.all([
      getPosts(),
      getComments(),
      getUsers(),
    ]);

    finishLoading();
    hideLoadingButton();

    const postsWithUsersAndComments = posts.map(post => ({
      ...post,
      user: users.find(user => user.id === post.userId),
      comments: comments.filter(comment => comment.postId === post.id),
    }));

    setPosts(postsWithUsersAndComments);

    return postsWithUsersAndComments;
  };

  const debounce = (f, delay) => {
    let timerId = 0;

    return (...args) => {
      clearTimeout(timerId);
      timerId = setTimeout(f, delay, ...args);
    };
  };

  const handleInputValue = (e) => {
    setInputValue(e.target.value);
    planFilterPosts(e.target.value);
  };

  const filterPosts = (value) => {
    setQuerySelector(value);
  };

  const planFilterPosts = useCallback(
    debounce(filterPosts, 1000),
    []
  );

  if (isLoading) {
    return (
      <h1 className="App">Loading...</h1>
    );
  }

  return loadingButton
    ? (
      <div className="box">
        <button
          type="button"
          onClick={handleLoading}
          className="filter__button button"
        >
          Load posts
        </button>
      </div>
    )
    : (
      <div className="App">
        <div className="filter">
          <h1>Redux List of Posts</h1>
          <p>
            all posts:
            {countAllPosts}
            {' '}
            visible posts:
            {countVisiblePosts}
          </p>
          <input
            type="text"
            className="filter__input"
            value={inputValue}
            onChange={handleInputValue}
          />
        </div>
        <PostList />
      </div>
    );
};

const mapStateToProps = state => ({
  isLoading: selectors.getIsLoading(state),
  loadingButton: selectors.getLoadingButton(state),
  countAllPosts: selectors.getAllPostsCount(state),
  countVisiblePosts: selectors.getPosts(state).length,
});

const mapDispatchToProps = {
  setPosts: actionCreators.setPosts,
  startLoading: actionCreators.startLoading,
  finishLoading: actionCreators.finishLoading,
  hideLoadingButton: actionCreators.hideLoadingButton,
  setQuerySelector: actionCreators.setQuerySelector,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

App.propTypes = {
  startLoading: PropTypes.func.isRequired,
  finishLoading: PropTypes.func.isRequired,
  hideLoadingButton: PropTypes.func.isRequired,
  setPosts: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  loadingButton: PropTypes.bool.isRequired,
  countAllPosts: PropTypes.number.isRequired,
  countVisiblePosts: PropTypes.number.isRequired,
  setQuerySelector: PropTypes.string.isRequired,
};
