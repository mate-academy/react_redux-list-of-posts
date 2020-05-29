import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './App.scss';

import { isLoading, getPosts, getError, getInitialized } from './redux/selectors';
import { loadPosts } from './redux/store';
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

  const shouldButtonHide = useMemo(() => !loading && !initialized, [loading, initialized]);
  const shouldPostsRender = useMemo(() => !error && !loading && initialized, [error, loading, initialized]);

  return (
    <main className="app">
      <div className="app__header">
        <h2 className="app__heading">Dynamic list of posts</h2>
        {shouldButtonHide
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
      {shouldPostsRender && <PostsList posts={posts} />}
    </main>
  );
};

export default App;
