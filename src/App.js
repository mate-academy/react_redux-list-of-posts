import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  selectPosts,
  selectLoading,
  selectSearchError,
  createActionSetPosts,
  createActionSetLoading,
  createActionFilterPosts,
} from './store/store';

import './App.scss';
import { getPosts, getUsers, getComments } from './api';
import PostList from './components/PostList';

const App = ({ isLoading, setLoading, posts, setPosts, filterPosts, isSearchError }) => {
  const loadData = async() => {
    setLoading(true);

    try {
      const [
        posts,
        users,
        comments,
      ] = await Promise.all([getPosts(), getUsers(), getComments()]);

      setPosts(posts.map(post => ({
        ...post,
        user: users.find(user => user.id === post.userId),
        comments: comments.filter(comment => comment.postId === post.id),
      })));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="list">
      <h1>Dynamic list of posts</h1>
      {posts.length !== 0 && (
        <section className="search-bar">
          <input
            type="text"
            placeholder="search post"
            className="input"
            onChange={event => filterPosts(event.target.value.toLowerCase().trim())}
          />

          {isSearchError && (
            <p className="warning">
              There are no such posts, please try another search combination
            </p>
          )}
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
      {!isLoading && (posts.length === 0 ? (
        <button
          className="button"
          type="button"
          onClick={loadData}
        >
          Load
        </button>
      ) : (
        <PostList />
      ))}
    </main>
  );
};

const mapStateToProps = state => ({
  posts: selectPosts(state),
  isLoading: selectLoading(state),
  isSearchError: selectSearchError(state),
});

const mapDispatchToProps = {
  setPosts: createActionSetPosts,
  setLoading: createActionSetLoading,
  filterPosts: createActionFilterPosts,
};

export default connect(mapStateToProps, mapDispatchToProps)(App);

App.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  setLoading: PropTypes.func.isRequired,
  posts: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  setPosts: PropTypes.func.isRequired,
  filterPosts: PropTypes.func.isRequired,
  isSearchError: PropTypes.bool.isRequired,
};
