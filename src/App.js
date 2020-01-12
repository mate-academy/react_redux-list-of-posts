import React from 'react';
import { connect } from 'react-redux';
import {
  Dimmer,
  Loader
} from 'semantic-ui-react';
import './App.css';
import { debounce } from './helpers/debounce';
import PostList from './components/PostList';
import {
  loadData,
  getIsSearchingPosts,
  getLoading,
  getPosts,
  getSearchingPosts,
  getError,
} from './redux/store';
import {
  handleSuccess,
} from './redux/actions';

const App = ({
  posts,
  searchingPosts,
  isLoading,
  hasError,
  isSearching,
  loading,
  handleResponseSuccess,
}) => {

  const loadAllData = () => {
    loading();
  }

  const searchPosts = (value) => {
    const searchQuery = value.toLowerCase();

    handleResponseSuccess(
      searchingPosts.filter(
        ({ title, body }) => (
          (title + body).toLowerCase().includes(searchQuery)
        )
      )
    )
  };

  const debounceHandler = debounce(searchPosts, 1000);

  if (hasError) {
    return (
      <p>
        you have some problems with your network,
        <br />
        please refresh the page
      </p>
    );
  }

  if (!posts.length && !isSearching) {
    return (
      <>
        <button
          type="button"
          onClick={() => loadAllData()}
        >
          {isLoading ? 'Loading...' : 'Load'}
        </button>
        {isLoading ?
        <Dimmer active>
          <Loader size="huge">LOADING.....</Loader>
        </Dimmer>
        : ''
        }
      </>
    );
  }

  if (posts.length === 2) {
    const postsStyle = document.querySelector('.posts').style;
    postsStyle.width = `900px`;
    postsStyle.margin = `20px auto`;
  }

  return (
    <div className="App">
      <h1>Dynamic list of posts</h1>
      <p className='posts-found'>
        {posts.length === 0 ? `no posts exists`: `posts found - `}
        {posts.length === 0 ? '' : posts.length}
      </p>
      <input
        className="input"
        placeholder="Search for posts"
        onChange={e => debounceHandler(e.target.value)}
      />
      <PostList />
    </div>
  );
}

const mapStateToProps = state => ({
  isSearching: getIsSearchingPosts(state),
  isLoading: getLoading(state),
  posts: getPosts(state),
  searchingPosts: getSearchingPosts(state),
  hasError: getError(state),
});

const mapDispatchToProps = dispatch => ({
  loading: () => dispatch(loadData()),
  handleResponseSuccess: posts => dispatch(handleSuccess(posts)),
});

export default connect(
  mapStateToProps, mapDispatchToProps
)(App);
