import React, { ChangeEvent } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import './App.scss';
import { Start } from './components/Start';
import { isLoading, getMessage, getFilteredPosts } from './store';
import { setQuery } from './store/search';
import PostList from './PostList';

const App = () => {
  const dispatch = useDispatch();
  const loading = useSelector(isLoading);
  const message = useSelector(getMessage) || 'Ready!';
  const posts = useSelector(getFilteredPosts);

  const onHandleInput = (event: ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    dispatch(setQuery(value));
  };

  return (
    <div className="App">
      <h1 className="display-5">Redux list of posts</h1>
      <h2>{loading ? <div className="spinner-border text-primary" role="status" /> : message}</h2>
      {posts.length === 0
      && <Start />}
      <input
        type="text"
        className="form-control mrl"
        onChange={onHandleInput}
      />
      <PostList posts={posts} />
    </div>
  );
};

export default App;
