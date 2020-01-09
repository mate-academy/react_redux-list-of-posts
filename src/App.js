import React from 'react';
import { connect } from 'react-redux';
import { DebounceInput as SearchInput } from 'react-debounce-input';
import PropTypes from 'prop-types';
import { POSTS_URL, USERS_URL, COMMENTS_URL } from './constants';
import PostList from './PostList';
import { loadFromServer } from './api';
import './App.css';
import { getSearchQuery, getPosts, getIsLoading } from './store';
import { setPosts } from './store/posts';
import { setSearchQuery } from './store/searchQuery';
import { setIsLoading } from './store/isLoading';

const App = (
  { posts,
    isLoading,
    // eslint-disable-next-line no-shadow
    searchQuery, setPosts, setSearchQuery, setIsLoading }
) => {
  const normalizePosts = (postsList, usersList, commentsList) => postsList
    .map(post => ({
      ...post,
      comments: commentsList.filter(comment => comment.postId === post.id),
      user: usersList.find(user => user.id === post.userId),
    }));

  const loadPosts = async() => {
    setIsLoading(true);

    const [postsList, usersList, commentsList] = await Promise.all([
      loadFromServer(POSTS_URL),
      loadFromServer(USERS_URL),
      loadFromServer(COMMENTS_URL),
    ]);

    const postsData = normalizePosts(
      postsList,
      usersList,
      commentsList,
    );

    setPosts(postsData);
    setIsLoading(false);
  };

  const filterPosts = (e) => {
    setSearchQuery(e.target.value.trim().toLowerCase());
  };

  const getFilteredPosts = () => posts.filter(
    post => (post.title + post.body).toLowerCase().includes(searchQuery),
  );

  return (
    <>
      {posts.length > 0 ? (
        <div className="post">
          <h1 className="title">
            Dynamic list of posts
          </h1>
          <SearchInput
            className="post__search"
            debounceTimeout={500}
            placeholder="Type to search..."
            onChange={filterPosts}
          />
          <PostList posts={getFilteredPosts()} />
        </div>
      ) : (
        <div className="post__start">
          <button
            disabled={isLoading}
            className="post__button"
            type="button"
            onClick={loadPosts}
          >
            {isLoading ? 'Loading...' : 'Load Posts'}
          </button>
        </div>
      )}
    </>
  );
};

const mapStateToProps = state => ({
  posts: getPosts(state),
  searchQuery: getSearchQuery(state),
  isLoading: getIsLoading(state),
});

export default connect(mapStateToProps, {
  setPosts, setSearchQuery, setIsLoading,
})(App);

App.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoading: PropTypes.bool.isRequired,
  searchQuery: PropTypes.string.isRequired,
  setPosts: PropTypes.func.isRequired,
  setSearchQuery: PropTypes.func.isRequired,
  setIsLoading: PropTypes.func.isRequired,
};
