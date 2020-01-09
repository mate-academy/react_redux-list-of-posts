import React from 'react';
import './App.css';
import { PostList } from '../PostList';
import { Header } from '../Header';
import { AppProps } from '../PropTypes/PropTypes';

class App extends React.Component {
  state = {
    filterInputValue: '',
  };

  handleInputFilter = ({ target }) => {
    this.setState({ filterInputValue: target.value });
    const { filterPosts } = this.props;
    filterPosts(target.value);
  }

  handleReset = () => {
    this.setState({ filterInputValue: '' });
    const { resetPosts } = this.props;
    resetPosts();
  }

  render() {
    const {
      isLoading, originalPosts, getData,
    } = this.props;
    const { filterInputValue } = this.state;

    if (isLoading) {
      return <p className="loading-text">Posts are loading now...</p>;
    }

    if (originalPosts.length === 0) {
      return (
        <button
          onClick={getData}
          type="button"
          className="data-button"
        >
        Load all posts
        </button>
      );
    }

    return (
      <main>
        <Header />
        <button
          type="button"
          className="reset-button"
          onClick={this.handleReset}
        >
          Return back posts and comments
        </button>
        <input
          type="text"
          onChange={this.handleInputFilter}
          value={filterInputValue}
          className="filter-input"
        />
        <PostList />
      </main>
    );
  }
}

App.propTypes = AppProps;

export default App;
