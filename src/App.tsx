import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './App.scss';

import { finishLoading, initPosts, startLoading } from './actions';
import { getLoading, getPosts } from './reducers';

import { getAppData } from './helpers/api';
import Filter from './components/Filter';
import Button from './components/Button';
import PostList from './components/PostList';


const App = () => {
  const dispatch = useDispatch();
  const posts = useSelector(getPosts);
  const loading = useSelector(getLoading);


  const initData = () => {
    dispatch(startLoading());

    getAppData()
      .then(postsFromServer => {
        dispatch(initPosts(postsFromServer));
      })
      .finally(() => {
        dispatch(finishLoading());
      });
  };

  return (
    <div className="App">
      <div className="container">
        <h1 className="text-center">
          Redux list of posts
          {posts.length}
        </h1>
        {!posts.length
        && (
          <Button
            text={loading ? 'Loading...' : 'Init data'}
            disabled={loading}
            onClick={initData}
          />
        )}
        {posts.length > 0 && <Filter />}
        {posts.length > 0 && <PostList />}
      </div>
    </div>
  );
};

export default App;
