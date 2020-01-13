import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './App.css';
import PostList from './PostList';
import { loadPosts } from './store';

function App({ posts, loadingButton, visibleContent, loadPosts }) {
  const [valueInput, setValue] = useState('');

  const setInputUsers = (event) => {
    setValue(event.target.value);
  };

  const filterPost = () => {
    const searchInText = valueInput.trim().toLowerCase();

    if (valueInput.length === 0) {
      return posts;
    }

    return posts.filter((post) => {
      if ((post.body + post.title).toLowerCase().includes(searchInText)) {
        return post;
      }

      return false;
    });
  };

  return (
    <div className="main">
      <h1 className="title">Dynamic list of posts</h1>
      {!visibleContent ? (
        <button
          type="button"
          onClick={loadPosts}
          className="loadButton"
        >
          {loadingButton}
        </button>
      ) : (
        <>
          <div className="input">
            <h2 className="input__title">Search post: </h2>
            <input
              type="text"
              className="input__searсh"
              value={valueInput}
              onChange={setInputUsers}
              onKeyDown={(event) => {
                if (event.key === 'Enter') {
                  return filterPost;
                }
              }}
            />
          </div>
          <PostList
            filterPost={filterPost()}
          />
        </>
      )
      }
    </div>
  );
}

App.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.object).isRequired,
  loadingButton: PropTypes.string.isRequired,
  visibleContent: PropTypes.bool.isRequired,
  loadPosts: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  posts: state.posts,
  loadingButton: state.loadingButton,
  visibleContent: state.visibleContent,
});

export default connect(
  mapStateToProps,
  {
    loadPosts,
  }
)(App);
