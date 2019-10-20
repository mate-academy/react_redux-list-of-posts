/* eslint-disable react/no-unused-state */
import React from 'react';

import PropTypes from 'prop-types';
import './App.css';
import PostsList from '../PostsList/PostsList';

class App extends React.Component {
  state = {}

  render() {
    const {
      preparedPosts, isLoading, hasError, loadDatas,
    } = this.props;
    console.log('render', preparedPosts);

    if (hasError) {
      return (
        <>
          <p>Error occured!</p>
          <button type="button" onClick={loadDatas}>Try again</button>
        </>
      );
    }

    return (
      <div className="App">
        <h1>React-redux list of posts</h1>
        {!isLoading
          ? (
            <button
              onClick={loadDatas}
              className="button-start"
              type="button"
            >
              Load
            </button>
          )
          : (
            <input
              type="search"
              onChange={() => 'hello'}
            />

          )}
        <PostsList posts={preparedPosts} />
      </div>
    );
  }
}

App.propTypes = {
  // handleSuccess: PropTypes.func.isRequired,
  // handleError: PropTypes.func.isRequired,
  // startLoading: PropTypes.func.isRequired,
  preparedPosts: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string,
      id: PropTypes.number,
    }).isRequired,
  ).isRequired,
  isLoading: PropTypes.bool,
  hasError: PropTypes.bool,
};

App.defaultProps = {
  hasError: false,
  isLoading: '',
};

export default App;
