import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './App.scss';

import { getPostsFromServer } from './helpers/api';
import PostList from './components/PostList';

import { isLoading, getPosts } from './store';
import { finishLoading, startLoading } from './store/loading';

const App = () => {
  const loading = useSelector(isLoading);
  const posts = useSelector(getPosts);
  const dispatch = useDispatch();

  const handleLoadClick = () => {
    dispatch(startLoading());

    getPostsFromServer()
      .then(
        postsFromServer => dispatch(finishLoading(postsFromServer))
      );
  };

  return (
    <>
      <div className="App">
        <h1>Dynamic list of posts</h1>
        {posts.length === 0 ? (
          <button type="button" onClick={handleLoadClick} disabled={loading}>
            {loading ? 'Loading' : 'Load'}
          </button>
        ) : (
            <PostList />
          )}
      </div>
    </>
  );
};

export default App;
