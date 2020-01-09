import PropTypes from 'prop-types';
import React, { useState } from 'react';
import { connect } from 'react-redux';
import  * as posts from './store/posts';
import  * as isLoaded from './store/isLoaded';
import  * as loading from './store/loading';
import  * as originalPost from './store/originalPost';

import PostList from './PostList';
import getDataFromServer from './api/GetDataFromServer';

const Main = ({
  posts, setPosts,
  isLoaded, setIsLoaded,
  loading, setIsLoading,
  originalPost, setOriginalPost,
}) => {
  const [textInput, setTextInput] = useState('');

  const loadPosts = async() => {
    setIsLoading(true);
    const [allUsers, allComments, allPosts]
    = await Promise.all([
      getDataFromServer('https://jsonplaceholder.typicode.com/users'),
      getDataFromServer('https://jsonplaceholder.typicode.com/comments'),
      getDataFromServer('https://jsonplaceholder.typicode.com/posts'),
    ]);

    setIsLoading(true);
    const unitedPost = allPosts.map(post => ({
      ...post,
      user: allUsers.find(user => user.id === post.userId),
      comments: allComments.filter(commentId => commentId.postId === post.id),
    }));

    setOriginalPost(unitedPost);
    setPosts(unitedPost);
    setIsLoading(false);
    setIsLoaded(true);
  };

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

  const filteredPost = originalPost.filter((post) => {
    const postContent = post.title + post.body;

    return postContent.includes(textInput);
  });

  if (JSON.stringify(filteredPost) !== JSON.stringify(posts)) {
    try {
      setPosts(filteredPost);
    } catch {
      setPosts([]);
    }
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
        {posts.length}
        {' '}
        posts found
      </p>
      <PostList posts={posts} />
    </section>
  );
};

const getStateFromStore = state => ({
  posts: state.posts,
  isLoaded: state.isLoaded,
  loading: state.loading,
  originalPost: state.originalPost,
})

const setStateToStore = {
  setPosts: posts.setPosts,
  setIsLoaded: isLoaded.setIsLoaded,
  setIsLoading: loading.setIsLoading,
  setOriginalPost: originalPost.setOriginalPost,
};

Main.propTypes = {
  posts: PropTypes.arrayOf(PropTypes.any).isRequired,
  setPosts: PropTypes.func.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  setIsLoaded: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  setIsLoading: PropTypes.func.isRequired,
}

export default connect(getStateFromStore, setStateToStore)(Main);
