import React, { useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './App.scss';

import {
  getLoading, getPosts, getErrorState, getInitialized,
} from './redux/store/selectors';
import { loadPosts } from './redux/store';
import { PostsList } from './components/PostsList';

const App = () => {
  const isLoading = useSelector(getLoading);
  const isInitialized = useSelector(getInitialized);
  const posts = useSelector(getPosts);
  const hasError = useSelector(getErrorState);
  const dispatch = useDispatch();

  const loadData = () => {
    dispatch(loadPosts());
  };

  const isButtonVisible = useMemo(
    () => !isLoading && !isInitialized,
    [isLoading, isInitialized]
  );
  const shouldPostsRender = useMemo(
    () => !hasError && !isLoading && isInitialized,
    [hasError, isLoading, isInitialized]
  );

  return (
    <main className="app">
      <div className="app__header">
        <h2 className="app__heading">Dynamic list of posts</h2>
        {isButtonVisible
        && (
          <button
            type="button"
            className="waves-effect waves-light btn deep-purple accent-3"
            onClick={loadData}
          >
            load data
          </button>
        )}
        {isLoading && <p>Loading...</p>}
        {hasError && (
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
