import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.scss';
import { Start } from './components/Start';
import {
  getIsLoading, getMessage, getFilteredPosts, getIsLoaded,
} from './store';
import { setQuery } from './store/search';
import PostList from './PostList';

const App = () => {
  const dispatch = useDispatch();
  const loading = useSelector(getIsLoading);
  const message = useSelector(getMessage) || 'Ready!';
  const posts = useSelector(getFilteredPosts);
  const isLoaded = useSelector(getIsLoaded);

  const handleInput = (event: React.FormEvent<HTMLInputElement>) => {
    const { value } = event.target as HTMLInputElement;

    dispatch(setQuery(value));
  };

  return (
    <div className="App">
      <h1 className="display-5">Redux list of posts</h1>
      <h2>{loading ? <div className="spinner-border text-primary" role="status" /> : message}</h2>
      {posts.length === 0
      && <Start />}
      {isLoaded
      && (
        <input
          type="text"
          className="form-control mrl"
          onChange={handleInput}
        />
      )}
      <PostList posts={posts} />
    </div>
  );
};

export default App;
