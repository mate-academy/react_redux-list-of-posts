import React from 'react';
import { Button } from 'semantic-ui-react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {
  postsURL,
  ACTION_TYPES,
  postDelete,
  commentDelete,
  filterAction,
  buttonFilter,
} from './components/redux/actions';
import {
  selectFilter,
  selectIsLoading,
  selectList,
  selectListError,
} from './components/redux/selectors';
import PostList from './components/PostList';
import Buttons from './components/Buttons';
import './App.css';

const App = ({
  isLoading,
  error,
  preparedPosts,
  filter,
  loadData,
  deletePost,
  deleteComment,
  filterCanged,
  filterbutton,
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
      <Buttons
        filter={filter}
        filterCanged={filterCanged}
        filterbutton={filterbutton}
        loadData={loadData}
      />
      <PostList
        posts={preparedPosts}
        deletePost={deletePost}
        deleteComment={deleteComment}
      />
    </div>
  );
}

function mapState2Props(state) {
  return {
    filter: selectFilter(state),
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
  deletePost: postId => dispatch(postDelete(postId)),
  deleteComment: commentId => dispatch(commentDelete(commentId)),
  filterCanged: value => dispatch(filterAction(value)),
  filterbutton: chosenFilter => dispatch(buttonFilter(chosenFilter)),
});

const Enhanced = connect(
  mapState2Props,
  mapDispatch2Props,
)(App);

export { Enhanced as App };

App.propTypes = {
  loadData: PropTypes.func.isRequired,
  filterCanged: PropTypes.func.isRequired,
  filterbutton: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
  deleteComment: PropTypes.func.isRequired,
  preparedPosts: PropTypes.arrayOf(PropTypes.object).isRequired,
  isLoading: PropTypes.bool,
  error: PropTypes.bool,
  filter: PropTypes.string,
};

Buttons.defaultProps = {
  error: false,
  isLoading: false,
  filter: '',
};
