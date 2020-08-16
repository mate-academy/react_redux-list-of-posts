import React from 'react';
import './App.css';
import { PostList } from './components/PostList/PostList';
import { getPreparedPosts } from './api/api';
import { useDispatch, useSelector } from 'react-redux';
import {
  setPosts,
  setLoadingStatus,
  setFilteredPosts,
  setSearchValue,
  getPosts,
  getLoadingStatus,
  getSearchValue,
  getFilteredPosts
} from './store';

const App: React.FC = () => {
  const dispatch = useDispatch();
  const posts = useSelector(getPosts);
  const isLoaded = useSelector(getLoadingStatus);
  const searchValue = useSelector(getSearchValue);
  const filteredPosts = useSelector(getFilteredPosts);

  const handleStart = async () => {
    dispatch(setLoadingStatus());

    const data = await getPreparedPosts();
    
    dispatch(setPosts(data));
    dispatch(setFilteredPosts(data));
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;

    dispatch(setSearchValue(value));
  };

  const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.keyCode === 13) {
      const filter = posts.filter(post => (
        post.title.includes(searchValue) || post.body.includes(searchValue)));

      dispatch(setFilteredPosts(filter));
      dispatch(setSearchValue(''));
    }
  };

  return (
    <div className="App">
      <h1>Static list of posts</h1>

      <p>
        <span>posts: </span>
        {filteredPosts.length}
      </p>

      { posts.length === 0
        ? (
          <button
            disabled={isLoaded}
            type="button"
            onClick={handleStart}
          >
            {!isLoaded ? 'Load' : 'Loading...'}
          </button>
        )
        : (
          <>
            <input
              type="text"
              onChange={handleChange}
              value={searchValue}
              onKeyUp={handleEnter}
              placeholder="Type word(s) and press Enter"
            />
            <PostList posts={filteredPosts} />
          </>
        )}
    </div>
  );
};

export default App;
