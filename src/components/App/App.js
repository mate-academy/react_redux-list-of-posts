import React, { Component } from 'react';
import './App.css';
import PostList from '../PostList/PostList';
import getPostsWithUsers from '../../utils/getPostsWithUsers';
import getPostWithComments from '../../utils/getPostWithComments';
import Search from '../Search/Search';

const API_URL = 'https://jsonplaceholder.typicode.com/';

const getData = dataName => (
  fetch(`${API_URL}${dataName}`)
    .then(response => response.json())
);

class App extends Component {
  state = {
    postList: [],
    filteredList: [],
    isLoading: false,
    isLoaded: false,
    isError: false,
    buttonText: 'Load',
  }

  loadDataFromServer = () => {
    this.setState({
      buttonText: 'loading...',
      isLoading: true,
    });

    Promise.all([
      getData('comments'),
      getData('posts'),
      getData('users'),
    ])
      .then(([comments, posts, users]) => {
        const postsWithComments = getPostWithComments(
          getPostsWithUsers(posts, users), comments
        );

        this.setState({
          postList: postsWithComments,
          filteredList: postsWithComments,
          isLoaded: true,
          isLoading: false,
          isError: false,
        });
      })
      .catch(() => {
        this.setState({
          buttonText: 'try again',
          isLoading: false,
          isError: true,
        });
      });
  };

  filterList = (searchStr) => {
    this.setState(prevState => ({
      filteredList: searchStr
        ? [...prevState.postList]
          .filter(post => (
            post.title.indexOf(searchStr) > 0
            || post.body.indexOf(searchStr) > 0
          ))
        : [...prevState.postList],
    }));
  }

  render() {
    const {
      filteredList,
      isLoaded,
      isLoading,
      buttonText,
      isError,
    } = this.state;

    if (!isLoaded) {
      let errorText = null;
      if (isError) {
        errorText = <p>No data, try again</p>;
      }
      return (
        <div>
          {errorText}
          <button
            type="submit"
            disabled={isLoading}
            onClick={this.loadDataFromServer}
          >
            {buttonText}
          </button>
        </div>
      );
    }

    return (
      <div className="App">
        <header className="header">
          <h1>Dynamic list of posts</h1>
          <h2>{`Posts: ${filteredList.length}`}</h2>
          <Search filterList={this.filterList} />
        </header>
        <PostList posts={filteredList} />
      </div>
    );
  }
}

export default App;
