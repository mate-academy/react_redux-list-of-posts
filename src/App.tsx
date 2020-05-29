import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './App.scss';

import { isLoading, getPosts, getError, getInitialized, loadPosts } from './store';
import { PostsList } from './components/PostsList';

const App = () => {
  const loading = useSelector(isLoading);
  const initialized = useSelector(getInitialized);
  const posts = useSelector(getPosts);
  const error = useSelector(getError);
  const dispatch = useDispatch();

  const loadData = () => {
    dispatch(loadPosts())
  };

  return (
    <main className="app">
      <div className="app__header">
        <h2 className="app__heading">Dynamic list of posts</h2>
        {!loading && !initialized
        && (
          <button
            type="button"
            className="waves-effect waves-light btn deep-purple accent-3"
            onClick={loadData}
          >
            load data
          </button>
        )}
        {loading && <p>Loading...</p>}
        {error && (
          <button
            type="button"
            className="waves-effect waves-light btn deep-purple accent-3"
            onClick={loadData}
          >
            try again
          </button>
        )}
      </div>
      {!error && !loading && initialized && <PostsList posts={posts} />}
    </main>
  );
};

export default App;
