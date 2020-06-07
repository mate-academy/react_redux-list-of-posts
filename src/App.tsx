import React from 'react';
import './App.scss';
import { useDispatch, useSelector } from 'react-redux';
import { getPreparedDataFromServer } from './helpers/api';
import { RootState } from './store';
import { startLoadingData, handleSuccessfulLoad } from './store/loading';
import { hanldeErrorLoad, dischargeError } from './store/errors';
import { handleSearchQuery } from './store/query';
import PostsList from './components/PostsList';
import { setPosts } from './store/posts';

const App = () => {
  const dispatch = useDispatch();
  const posts = useSelector((state: RootState) => state.posts);
  const loadingStatus = useSelector((state: RootState) => state.isLoading);
  const errorStatus = useSelector((state: RootState) => state.hasErrors);

  const getData = async () => {
    try {
      dispatch(dischargeError());
      dispatch(startLoadingData());
      const data = await getPreparedDataFromServer();

      dispatch(setPosts(data));
      dispatch(handleSuccessfulLoad());
    } catch {
      dispatch(hanldeErrorLoad());
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
            onChange={(e) => {
              const searchVal = e.target.value;

              dispatch(handleSearchQuery(searchVal));
            }}
            placeholder="search the post"
          />
          <PostsList />
        </>
      )}
    </div>
  );
};

export default App;
