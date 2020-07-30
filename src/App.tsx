import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './App.scss';
import { Start } from './components/Start';
import {
  isLoading, getMessage, getPosts, getQuery,
} from './store';
import { PostsList } from './components/PostList';
import { setQuery } from './store/query';

const App = () => {
  const dispatch = useDispatch();
  const loading = useSelector(isLoading);
  const message = useSelector(getMessage) || 'Ready!';
  const preparedPosts = useSelector(getPosts);
  const query = useSelector(getQuery);

  const handleChange = (value: string) => {
    dispatch(setQuery(value));
  };

  return (
    <div className="App">
      <h1>Redux list of posts</h1>
      <h2>{loading ? 'Loading...' : message}</h2>

      {
        preparedPosts.posts
          ? (
            <>
              <span>Search:</span>
              <input
                type="text"
                value={query}
                onChange={(event) => handleChange(event.target.value)}
              />
              <PostsList />
            </>
          )
          : (
            <Start />
          )
      }
    </div>
  );
};

export default App;
