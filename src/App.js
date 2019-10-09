import React from 'react';
import './App.css';

import { LoadingPage } from './components/LoadingPage/LoadingPage';
import { PostList } from './components/PostList/PostList';
import {
  getPostsWithUsers, loaded, loading, store,
} from './store';
import { getData } from './api/data';

export class App extends React.Component {
  state = {
    posts: store.getState().posts,
  };

  componentDidMount() {
    this.unsubscribe = store.subscribe(() => this.setState({
      posts: store.getState().posts,
    }));
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  getData = () => {
    store.dispatch(loading());
    Promise.all([getData('posts'), getData('users'), getData('comments')]).then(
      ([posts, users, comments]) => {
        store.dispatch(loading());
        store.dispatch(getPostsWithUsers(posts, users, comments));
        store.dispatch(loaded());
      }
    );
  };

  render() {
    const { posts, isLoading, isLoaded } = store.getState();
    return (
      <div className="main">
        <h1>Dynamic list of posts</h1>
        <p>
          <span>posts: </span>
          {posts.length}
        </p>
        {!isLoaded && !isLoading && (
          <button onClick={this.getData} className="btn btn-outline-dark">
            Load posts
          </button>
        )}
        <LoadingPage />
        {isLoaded && <PostList />}
      </div>
    );
  }
}
