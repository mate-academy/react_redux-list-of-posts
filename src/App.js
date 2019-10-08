import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './App.css';
import PostList from './components/PostList/PostList';
import { loadDataFromServer } from './store';

const App = ({
  posts,
  isLoading,
  hasError,
  loadData,
}) => {
  const titleButton = (hasError ? 'Try again' : 'Load posts');
  const classForButton = (
    isLoading
      ? 'btn btn-secondary'
      : 'btn btn-primary'
  );

  return (
    <div className="app">
      <h1>Static list of posts</h1>

      {posts.length
        ? (
          <>
            <span>posts: </span>
            {posts.length}
          </>
        )
        : (
          <>
            <p>No posts yet..</p>
            {hasError
              ? <p className="alert alert-danger">Error occurred!</p>
              : null
            }
            <button
              type="button"
              className={classForButton}
              onClick={loadData}
              disabled={isLoading}
            >
              {isLoading
                ? 'Loading...'
                : titleButton
              }
            </button>
          </>
        )
      }
      <PostList />
    </div>
  );
};

const getDataState = state => ({
  posts: state.posts,
  isLoading: state.isLoading,
  hasError: state.hasError,
});

const getMethod = dispatch => ({
  loadData: () => dispatch(loadDataFromServer()),
});

App.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.shape({
    userId: PropTypes.number,
    id: PropTypes.number,
    title: PropTypes.string,
    body: PropTypes.string,
  })).isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  loadData: PropTypes.func.isRequired,
};

export default connect(
  getDataState,
  getMethod
)(App);
