import React, { Dispatch, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import debounce from 'lodash.debounce';
import {
  setLoading,
  setPosts,
  changeInputValue,
  filteredPosts,
  changeDebounceInputValue,
  AllActions,
  InitialState,
} from './store/index';
import './App.scss';
import { postsFromServer } from './helpers/api';
import PostList from './components/PostList/PostList';


const App = () => {
  const dispatch = useDispatch<Dispatch<AllActions>>();
  const preparePosts = useSelector(filteredPosts);
  const posts = useSelector((state: InitialState) => state.posts);
  const inputValue = useSelector((state: InitialState) => state.inputValue);
  const isLoading = useSelector((state: InitialState) => state.loadingStatus);

  const fetchData = (): void => {
    dispatch(setLoading(true));
    postsFromServer.then(data => {
      dispatch(setLoading(false));

      dispatch(setPosts(data));
    });
  };

  const dispatchInputValue = (inputParam: string) => {
    dispatch(changeDebounceInputValue(inputParam));
  };

  const debounceInputValue = useCallback(debounce(dispatchInputValue, 1000), []);

  return (
    <div className="app">
      <h1>Dynamic list of posts</h1>
      {posts.length > 1
      && (
        <input
          type="text"
          className="app__input"
          value={inputValue}
          onChange={
            ({ target }) => {
              dispatch(changeInputValue(target.value));
              debounceInputValue(target.value);
            }
          }
        />
      )}
      <PostList posts={preparePosts} />
      {posts.length === 0
      && (
        <button
          type="button"
          className="app__button"
          onClick={() => fetchData()}
        >
          {isLoading ? 'Loading...' : 'Get Posts'}
        </button>
      )}
    </div>
  );
};


export default App;
