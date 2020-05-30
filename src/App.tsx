import React from 'react';

import './App.scss';
import { useSelector, useDispatch } from 'react-redux';
import { isLoading, isLoaded } from './store';
import { SpinnerLoad } from './components/SpinnerLoad';
import { setLoading } from './store/loading';
import { preparedDatas } from './helpers/api';
import { setPostsData } from './store/posts';
import { setLoaded } from './store/loaded';
import { DownloadButton } from './components/DownloadButton';
import { PostsList } from './components/PostsList';
import { SearchInput } from './components/Input';

const App = () => {
  const loading = useSelector(isLoading);
  const loaded = useSelector(isLoaded);
  const dispatch = useDispatch();

  const getPostsData = () => {
    dispatch(setLoading(true));

    preparedDatas()
      .then(data => {
        dispatch(setPostsData(data));
        dispatch(setLoaded());
      })
      .finally(() => dispatch(setLoading(false)));
  };

  return (
    <div className="App">
      <h1 className="title">Redux list of posts</h1>
      {!loaded && (
        <DownloadButton
          getData={getPostsData}
        />
      )}
      {loading && <SpinnerLoad />}
      {loaded && (
        <>
          <SearchInput />
          <PostsList />
        </>
      )}
    </div>
  );
};

export default App;
