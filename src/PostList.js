import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { getPostsFromServer, getUsers, getComments } from './ArrsAPI';
import * as functions from './store';
import Post from './Post';
import * as postFunctions from './PostsReducer';
import * as loadingFunctions from './LoadingReducer';

const modifyPosts = async() => {
  const [posts, users, comments] = await Promise
    .all([getPostsFromServer(), getUsers(), getComments()]);

  return posts.map((post) => {
    const currentUser = users.find(user => user.id === post.userId);
    const userComment = comments
      .filter(comment => comment.postId === post.id);

    return {
      ...post,
      user: currentUser,
      comments: userComment,
    };
  });
};

const PostList = ({
  setPosts,
  changeLoading,
  changeLoaded,
  changeError,
  posts,
  isLoading,
  loaded,
  error,
  setFilterPosts,
  filteredPosts,
}) => {
  const [input, setInput] = useState('');

  const loadPosts = async() => {
    try {
      changeLoading(true);

      const postsFromServer = await modifyPosts();

      setPosts(postsFromServer);
      changeLoading(false);
      changeLoaded(true);
      changeError(false);
    } catch (e) {
      changeError(true);
    }
  };

  const inputHandler = (value) => {
    const searchQuery = value.toLowerCase().trim();

    setInput(searchQuery);

    let filtered = posts
      .filter(post => post.title.includes(searchQuery)
        || post.body.includes(searchQuery));

    if (searchQuery.length === 0) {
      filtered = [];
    }
    setFilterPosts(filtered);
  };

  const debouncedInputHandler = _.debounce(inputHandler, 500);

  const postsToShow = input.length !== 0 ? filteredPosts : posts;

  return (
    <div>
      {posts.length === 0 && !error && !isLoading
        && (
          <button
            className="load"
            type="button"
            onClick={loadPosts}
          >
            Load
          </button>
        )
      }
      {isLoading && !error && <div className="loading">Loading...</div>}
      {loaded && !isLoading && (
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
          {postsToShow.map(post => (
            <Post post={post} key={post.id} />
          ))}
        </div>
      )}
      {error && (
        <div className="button_container">
          <p className="error">Error occurred</p>
          <button
            className="load"
            type="button"
            onClick={loadPosts}
          >
            Try again
          </button>
        </div>
      )}
    </div>
  );
};

const getExtraData = state => ({
  posts: functions.getPosts(state.posts),
  isLoading: functions.getLoading(state.loading),
  loaded: functions.getLoaded(state.loading),
  error: functions.getError(state.loading),
  filteredPosts: functions.getFilteredPosts(state.posts),
});

const getExtraMethods = dispatch => ({
  setPosts: value => dispatch(
    postFunctions.setPosts(value)
  ),
  changeLoading: value => dispatch(
    loadingFunctions.changeLoading(value)
  ),
  changeLoaded: value => dispatch(
    loadingFunctions.changeLoaded(value)
  ),
  changeError: value => dispatch(
    loadingFunctions.changeError(value)
  ),
  setFilterPosts: value => dispatch(
    postFunctions.setFilterPosts(value)
  ),

});

PostList.propTypes = {
  posts: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
  setPosts: PropTypes.func.isRequired,
  changeLoading: PropTypes.func.isRequired,
  changeLoaded: PropTypes.func.isRequired,
  changeError: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
  loaded: PropTypes.bool.isRequired,
  error: PropTypes.bool.isRequired,
  setFilterPosts: PropTypes.func.isRequired,
  filteredPosts: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    .isRequired,
};

export default connect(getExtraData, getExtraMethods)(PostList);
