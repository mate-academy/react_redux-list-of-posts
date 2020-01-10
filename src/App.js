import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import './App.css';
import {
  getPostsFromServer, getUsersFromServer, getCommentsFromServer,
} from './api';
import { debounce } from './debounce';
import {
  getPosts, getLoading, getLoaded, getFilter,
  setPostsAC, setLoadingAC, setLoadedAC, setFilterAC,
} from './store';
import PostList from './PostList';

const App = ({ posts, loading, loaded, filter,
  setPosts, setLoading, setLoaded, setFilter }) => {
  const loadPosts = async() => {
    setLoading(true);

    const [postsFromServer,
      usersFromServer,
      commentsFromServer] = await Promise.all(
      [getPostsFromServer(), getUsersFromServer(), getCommentsFromServer()]
    );

    const preparedPosts = postsFromServer.map((post) => {
      const user = usersFromServer.find(item => item.id === post.userId);
      const comments = commentsFromServer
        .filter(comment => comment.postId === post.id);

      return {
        ...post, user, comments,
      };
    });

    setPosts(preparedPosts);
    setLoaded(true);
    setLoading(false);
  };

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
              : 'loading... Please wait...'}
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
  setPosts: setPostsAC,
  setLoading: setLoadingAC,
  setLoaded: setLoadedAC,
  setFilter: setFilterAC,
};

App.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  filter: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
  loaded: PropTypes.bool.isRequired,
  setPosts: PropTypes.func.isRequired,
  setFilter: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  setLoaded: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchtoProps)(App);
