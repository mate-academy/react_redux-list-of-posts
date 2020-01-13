import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import { loadData, deletePost, deleteComment } from './store';
import './App.css';
import PostList from './PostList';

function App({ postsWithUsers, isLoading, loadingData }) {
  const [searchItem, setSearchItem] = useState('');

  const loading = () => {
    loadingData();
  };

  const handleChangeItem = () => {
    setSearchItem(searchItem.toLowerCase());
  };

  const filteredItems = () => (postsWithUsers
    .filter(post => (post.title + post.body)
      .toLowerCase().includes(searchItem)));

  const postsToBeShown = searchItem ? filteredItems() : postsWithUsers;

  return (
    <div className="App">
      <h1 className="title">React/Redux List of Posts</h1>
      {postsWithUsers.length > 0 ? (
        <>
          <input
            type="text"
            className="search-bar"
            placeholder="Search..."
            onChange={handleChangeItem}
          />
          <PostList posts={postsToBeShown} />
        </>
      ) : (
        <button
          className="button"
          type="button"
          disabled={isLoading}
          onClick={() => loading()}
        >
          {isLoading ? 'Loading...' : 'Load'}
        </button>
      )}
    </div>
  );
}

const mapStateToProps = state => ({
  postsWithUsers: state.postsWithUsers,
  isLoading: state.isLoading,
});

const mapDispatchToProps = dispatch => ({
  loadingData: () => dispatch(loadData()),
  deletePost: id => dispatch(deletePost(id)),
  deleteComment: id => dispatch(deleteComment(id)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(App);

App.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  postsWithUsers: PropTypes.arrayOf(PropTypes.object).isRequired,
  loadingData: PropTypes.func.isRequired,
};
