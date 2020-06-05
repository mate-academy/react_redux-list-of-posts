import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import './App.scss';
import { Start } from './components/Start';

import {
  isLoading,
  getMessage,
  getVisiblePosts,
  getQuery,
  getIsLoaded,
} from './store';
import { PostList } from './components/PostList';

import { setQuery } from './store/query';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const loading = useSelector(isLoading);
  const message = useSelector(getMessage) || 'Ready!';
  const visiblePosts = useSelector(getVisiblePosts);
  const query = useSelector(getQuery);
  const isLoadingCompleted = useSelector(getIsLoaded);

  const handleSearchPhrase = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.target as HTMLInputElement;

    dispatch(setQuery(value));
  };

  return (
    <div className="App">
      <h1>Redux list of posts</h1>
      <h2>{loading ? 'Loading...' : message}</h2>
      {isLoadingCompleted
        ? (
          <div className="control">
            <input
              type="text"
              id="search-query"
              className="form-control mr-sm-2"
              placeholder="Search"
              value={query}
              onChange={handleSearchPhrase}
            />
          </div>
        )
        : <Start />}
      <PostList posts={visiblePosts} />
    </div>
  );
};

export default App;
