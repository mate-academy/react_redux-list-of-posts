import React from 'react';
import PropTypes from 'prop-types';
import './App.css';
import PostList from '../PostList/Index';
import Search from '../Search/Index';

const App = (props) => {
  const {
    loadDataFromServer,
    filteredList,
    isLoaded,
    isLoading,
    buttonText,
    isError,
  } = props;

  const loadData = () => {
    loadDataFromServer();
  };

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
          onClick={loadData}
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
      <PostList />
    </div>
  );
};

App.propTypes = {
  loadDataFromServer: PropTypes.func.isRequired,
  isLoaded: PropTypes.bool.isRequired,
  isLoading: PropTypes.bool.isRequired,
  buttonText: PropTypes.string.isRequired,
  isError: PropTypes.bool.isRequired,
  filteredList: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.number,
      id: PropTypes.number,
      title: PropTypes.string,
      body: PropTypes.string,
      user: PropTypes.object.isRequired,
      comments: PropTypes.array.isRequired,
    }).isRequired,
  ).isRequired,
};

export default App;
