import React from 'react';
import { connect } from 'react-redux';

import './App.css';
import {getData} from './Get';
import PostList from './PostList';

import {
  setPosts,
  getLoading,
  getIsLoading,
  getIsLoaded,
  getLoadedPosts,
  getPostTemplate,
  setFilteredPosts,
        } from './store';

class App extends React.Component {

  handleLoad = async() => {
    const { setPosts, getLoading} = this.props;
    getLoading();
    const postsWithUserAndComments = await getData();
    setPosts(postsWithUserAndComments);
  };

  filteringPosts = (event) => {
    const { setFilteredPosts } = this.props;
    const { value } = event.target;
    setFilteredPosts(value)
  };

  render() {
    const { isLoaded, isLoading } = this.props
    if (!isLoaded) {
      return (
        <button
          className="app_load-button"
          type="button"
          onClick={this.handleLoad}
          hidden={isLoaded}
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Load'}
        </button>
      );
    }
    return (
      <div className="app">
        <div>
          <label>
            <input
              type="text"
              placeholder="Search post by body or title..."
              onChange={this.filteringPosts}
              className="app_search-input"
            />
          </label>
        </div>
        <PostList loadedPosts={this.props.loadedPosts} />
      </div>
    );
  }
}

const getProps = state => ({
  loadedPosts: getLoadedPosts(state),
  postTemplate: getPostTemplate(state),
  isLoaded: getIsLoaded(state),
  isLoading: getIsLoading(state),
});

const getMethods = dispatch => ({
  getLoading: () => dispatch(getLoading()),
  setPosts: (value) => dispatch(setPosts(value)),
  setFilteredPosts: (value) => dispatch(setFilteredPosts(value)),
});

export default connect(getProps, getMethods)(App);
