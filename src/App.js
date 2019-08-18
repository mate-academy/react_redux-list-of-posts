import React, { useState } from 'react';
import { connect } from 'react-redux';
import './App.css';
import { loading } from './components/store';
import PostList from './components/PostList';
import FilterForm from './components/FilterForm';
import { getPostsWithUsers } from './components/loadingData';

const App = ({ loadPosts }) => {
  const [isLoaded, setLoading] = useState('Load');

  const handleClick = (e) => {
    const loadButton = e.target;

    setLoading('Loading...');

    loadButton.disabled = isLoaded === 'Loading...';

    getPostsWithUsers().then((data) => {
      loadPosts(data);
      setLoading('Loaded');
    });
  };

  return (
    <div className="App">
      <h1>List of posts</h1>
      {
        (isLoaded !== 'Loaded')
          ? (
            <button
              type="button"
              className="load-button"
              onClick={handleClick}
            >
              {isLoaded}
            </button>
          )
          : (
            <div>
              <FilterForm />
              <PostList />
            </div>
          )
      }
    </div>
  );
};

const getMethods = dispatch => ({
  loadPosts: value => dispatch(loading(value)),
});

export default connect(null, getMethods)(App);
