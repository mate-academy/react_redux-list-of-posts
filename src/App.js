import React from 'react';
import './App.css';
import { connect } from 'react-redux';
import PostList from './components/PostList/PostList';
import { loadDataFromServer } from './store';

const App = ({posts, isLoading, hasError, loadData}) => {
  const titleButton = (hasError ? 'Try again' : 'Load posts');
  const classForButton = (
    isLoading
      ? 'btn btn-secondary'
      : 'btn btn-primary'
  );

  return (
    <div className="App">
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

export default connect(
  getDataState,
  getMethod
)(App);
