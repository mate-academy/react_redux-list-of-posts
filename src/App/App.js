import React from 'react';
import { PostList } from '../PostList/index';
import './App.css';

const App = ({
  isLoading,
  isLoaded,
  searchWord,
  getPosts,
  resetPostsFiltering,
  handleSearchInputChange,
  filterPosts,
}) => (
  <div className="App">
    <h1>Static list of posts</h1>
    {
      (isLoaded && (
        <>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              filterPosts();
            }}
          >
            <input
              type="text"
              value={searchWord}
              onChange={e => handleSearchInputChange(e.target.value)}
            />
          </form>
          <button
            type="button"
            onClick={resetPostsFiltering}
            className="mt-30"
          >
            Reset
          </button>
          <PostList />
        </>
      ))
      || (isLoading && (<button type="button" disabled>loading...</button>))
      || (<button type="button" onClick={getPosts}>Load</button>)
    }
  </div>
);

export default App;
