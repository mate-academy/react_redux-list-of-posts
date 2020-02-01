import React from 'react';
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  postsURL,
  ACTION_TYPES,
} from './components/redux/actions';
import {
  selectIsLoading,
  selectList,
  selectListError,
} from './components/redux/selectors';
import PostList from './components/PostList';
import ButtonsList from './components/Buttons';
import './App.css';

const App = ({
  isLoading,
  error,
  preparedPosts,
  loadData,
}) => {
  if (isLoading) {
    return (
      <p>loading...</p>
    );
  }

  if (error) {
    return (
      <>
        <p>Error occurred!!!</p>
        <Button
          type="button"
          onClick={() => loadData(true)}
        >
          Try Again!
        </Button>
      </>
    );
  }

  if (!preparedPosts || !preparedPosts.length) {
    return (
      <>
        <p>No posts yet!</p>
        <Button type="button" onClick={() => loadData(true)} color="green">
          Load
        </Button>
      </>
    );
  }

  return (
    <div className="App">
      <h1>List of posts</h1>
      <ButtonsList />
      <PostList
        posts={preparedPosts}
      />
    </div>
  );
};

function mapState2Props(state) {
  return {
    preparedPosts: selectList(state),
    error: selectListError(state),
    isLoading: selectIsLoading(state),
  };
}

const mapDispatch2Props = dispatch => ({
  loadData: () => dispatch(postsURL()),
  stopLoading: isLoading => dispatch({
    type: ACTION_TYPES.STOP_LOADING,
    isLoading,
  }),
});

const Enhanced = connect(
  mapState2Props,
  mapDispatch2Props,
)(App);

export { Enhanced as App };

App.propTypes = {
  loadData: PropTypes.func.isRequired,
  preparedPosts: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.bool,
};

App.defaultProps = {
  error: false,
  isLoading: false,
};
