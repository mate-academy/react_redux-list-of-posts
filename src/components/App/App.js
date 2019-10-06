import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';
import PostList from '../PostList/PostList';
import Search from '../Search/Index';

class App extends Component {
  loadData = () => {
    const { loadDataFromServer } = this.props;
    loadDataFromServer();
  };

  render() {
    const {
      filteredList,
      isLoaded,
      isLoading,
      buttonText,
      isError,
    } = this.props;
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
            onClick={this.loadData}
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
          <Search />
        </header>
        <PostList posts={filteredList} />
      </div>
    );
  }
}

App.propTypes = {
  loadDataFromServer: PropTypes.func.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  buttonText: PropTypes.string.isRequired,
  isError: PropTypes.bool.isRequired,
  filteredList: PropTypes.arrayOf.isRequired,
};

export default App;
