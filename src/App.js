import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './App.css';
import { getData } from './store';
import PostList from './components/PostList';

const App = ({ data, isLoading, getPosts }) => {
  if (isLoading) {
    return (
      <div className="hoja">Loading...</div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="App">
        <button
          className="btnLoad"
          type="button"
          onClick={getPosts}
        >
          Load Posts
        </button>
      </div>
    );
  }

  return (
    <div className="App">
      <PostList />
    </div>
  );
};

const mapStateToProps = state => ({
  data: state.data,
  isLoading: state.isLoading,
});

const mapDispatchToMethod = dispatch => ({
  getPosts: () => dispatch(getData()),
});

App.propTypes = {
  data: PropTypes.oneOfType([PropTypes.array]).isRequired,
  isLoading: PropTypes.bool.isRequired,
  getPosts: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToMethod)(App);
