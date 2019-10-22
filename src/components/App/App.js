import React from 'react';
import './App.css';
import { PostList } from '../PostList';

const App = ({
  loadData,
  preparedPosts,
  comments,
  users,
  originalPosts,
  isLoading,
  searchPost,
}) => (
  <div className="App">
    <h1>Dynamic list of posts</h1>

    <p>
      <span>posts: </span>
      {originalPosts.length}
    </p>

    <p>
      <span>comments: </span>
      {comments.length}
    </p>

    <p>
      <span>Users: </span>
      {users.length}
    </p>
    {originalPosts.length === 0 ? (
      <button type="button" onClick={loadData} className="btn btn-info">
        {isLoading ? (
          <span className="spinner-border spinner-border-sm" />
        ) : (
          <span>Load</span>
        )}
        {' '}
      </button>
    ) : (
      <>
        <input
          type="text"
          name="text"
          placeholder="Write text you find"
          className="form-control"
          onChange={searchPost}
        />
        <PostList posts={preparedPosts} comments={comments} />
      </>
    )}
  </div>
);

export default App;
