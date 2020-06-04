import React from 'react';
import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getPreparedDataFromServer } from './helpers/api';
import {
  RootState,
  SUCCESSFUL_LOADING,
  HANDLE_ERROR_LOADING,
  START_LOADING_DATA,
} from './store';
import PostsList from './components/PostsList';

const App = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.posts);
  const loadingStatus = useSelector((state: RootState) => state.isLoading);
  const errorStatus = useSelector((state: RootState) => state.hasErrors);

  const getData = async () => {
    try {
      dispatch({ type: START_LOADING_DATA });
      const data = await getPreparedDataFromServer();

      dispatch({ type: SUCCESSFUL_LOADING, posts: data });
    } catch {
      dispatch({ type: HANDLE_ERROR_LOADING });
    }
  };

  return (
    <div className="App">
      <h1>Dynamic list of posts</h1>
      {errorStatus && <h1>Some errors appeared. Please, try again</h1>}
      {posts.length === 0 ? (
        <button
          type="button"
          onClick={getData}
          disabled={loadingStatus}
          className="button"
        >
          {loadingStatus ? 'Loading...' : 'Load'}
        </button>
      ) : (
        <>
          <input
            type="text"
            onChange={(e) => dispatch({ type: 'SET_QUERY', query: e.target.value })}
            placeholder="search the post"
          />
          <PostsList />
        </>
      )}

    </div>
  );
};

export default App;
