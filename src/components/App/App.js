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
  loadDataFromServer: PropTypes.func,
  isLoaded: PropTypes.bool,
  isLoading: PropTypes.bool,
  isError: PropTypes.bool,
  buttonText: PropTypes.string,
  filteredList: PropTypes.arrayOf(
    PropTypes.shape({
      userId: PropTypes.number,
      id: PropTypes.number,
      title: PropTypes.string,
      body: PropTypes.string,
      user: PropTypes.object.isRequired,
      comments: PropTypes.array.isRequired,
    }).isRequired,
  ),
};

App.defaultProps = {
  loadDataFromServer: () => {},
  filteredList: [],
  isLoaded: false,
  isLoading: false,
  isError: false,
  buttonText: '',
};

export default App;
