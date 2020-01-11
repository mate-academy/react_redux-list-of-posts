import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import * as isLoaded from './store/isLoaded';
import * as loading from './store/loading';
import * as post from './store/post';
import * as index from './store/index';
import PostList from './PostList';

const Main = ({ isLoaded, loading, post, loadPosts }) => {
  const [textInput, setTextInput] = useState('');

  const filteredPost = post.filter((post) => {
    const postContent = post.title + post.body;

    return postContent.includes(textInput);
  });;

  function debounce(f, delay) {
    let timer;

    return (...args) => {
      clearTimeout(timer);
      timer = setTimeout(() => f(...args), delay);
    };
  }

  const inputText = debounce(setTextInput, 1000);

  if (loading) {
    return (
      <p className="App">...LOADING</p>
    );
  }

  if (!isLoaded) {
    return (
      <section className="App">
        <button type="button" onClick={loadPosts}>
          Load
        </button>
      </section>
    );
  }

  return (
    <section className="App">
      <input
        id="text"
        type="text"
        placeholder="Search..."
        onChange={event => inputText(event.target.value)}
      />
      <p>
        {filteredPost.length}
        {' '}
        posts found
      </p>
      <PostList posts={filteredPost} />
    </section>
  );
};

const getStateFromStore = state => ({
  isLoaded: state.isLoaded,
  loading: state.loading,
  post: state.post,
})

const setStateToStore = {
  setIsLoaded: isLoaded.setIsLoaded,
  setIsLoading: loading.setIsLoading,
  setPost: post.setPosts,
  loadPosts: index.loadPosts,
};

Main.propTypes = {
  isLoaded: PropTypes.bool.isRequired,
  setIsLoaded: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  setIsLoading: PropTypes.func.isRequired,
}

export default connect(getStateFromStore, setStateToStore)(Main);
