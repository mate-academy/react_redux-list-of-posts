import React from 'react';
import './App.css';
import { LoadingPage } from '../LoadingPage';
import { PostList } from '../PostList';

class App extends React.Component {
  render() {
    const {
      isLoading,
      isLoaded,
      getDataFromApi,
      posts,
    } = this.props;
    return (
      <div className="main">
        <h1>Dynamic list of posts</h1>
        <p>
          <span>posts: </span>
          {posts.length}
        </p>
        {!isLoaded && !isLoading && (
          <button onClick={getDataFromApi} className="btn btn-outline-dark">
            Load posts
          </button>
        )}
        <LoadingPage />
        {isLoaded && <PostList />}
      </div>
    );
  }
}

export default App;
