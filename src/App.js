import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './App.css';
import PostList from './components/PostList/PostList';
import { loadDataFromServer, changeFilter, getfilteredPosts } from './store';

const App = ({
  posts,
  filteredPosts,
  isLoading,
  hasError,
  loadData,
  changeInput,
}) => {
  const titleButton = (hasError ? 'Try again' : 'Load posts');
  const classForButton = (
    isLoading
      ? 'btn btn-secondary'
      : 'btn btn-primary'
  );
  const lengthFilteredPosts = filteredPosts.length;
  const lengthPosts = posts.length;

  return (
    <div className="app">
      <div className="header">
        <h1>Static list of posts</h1>

        {lengthPosts
          ? (
            <>
              <p>{`posts:${lengthPosts}`}</p>
              <div className="filter">
                <label htmlFor="filter">
                  FILTER BY POST TITLE:
                  <input
                    id="filter"
                    type="text"
                    placeholder="Enter text from title of post..."
                    onChange={({ target }) => changeInput(target.value)}
                  />
                  {lengthFilteredPosts !== lengthPosts
                    && ` selected ${lengthFilteredPosts} posts`}
                </label>
              </div>
            </>
          )
          : (
            <>
              <p>No posts yet..</p>
              {hasError && (
                <p className="alert alert-danger">Error occurred!</p>)
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
      </div>
      <PostList />
    </div>
  );
};

const getDataState = state => ({
  posts: state.posts,
  isLoading: state.isLoading,
  hasError: state.hasError,
  filteredPosts: getfilteredPosts(state),
});

const getMethod = dispatch => ({
  loadData: () => dispatch(loadDataFromServer()),
  changeInput: text => dispatch(changeFilter(text)),
});

const shapePosts = PropTypes.shape({
  userId: PropTypes.number,
  id: PropTypes.number,
  title: PropTypes.string,
  body: PropTypes.string,
});

App.propTypes = {
  posts: PropTypes.arrayOf(shapePosts).isRequired,
  filteredPosts: PropTypes.arrayOf(shapePosts).isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  loadData: PropTypes.func.isRequired,
  changeInput: PropTypes.func.isRequired,
};

export default connect(
  getDataState,
  getMethod
)(App);
