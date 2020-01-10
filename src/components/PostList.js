import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { DebounceInput } from 'react-debounce-input';
import { Button,
  Grid,
  Container,
  Dimmer,
  Loader } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import PostItem from './PostItem';
import '../App.css';
import {
  createActionStartLoading,
  createActionHandleError,
  createActionHandleSuccess,
  createActionloadTodos,
  getPosts,
  getStatusLoading,
  getError,
  createActionSearchQuery,
  getStatusIsInit,
} from '../store/store';

function PostList(
  {
    combineData,
    isLoading,
    hasError,
    loadDataFromServer,
    searchQuery,
    isInit,
  }
) {
  const loadPosts = () => {
    loadDataFromServer();
  };

  return (
    <Container className="App">
      {
        (combineData.length > 0 || isInit)
          && (
            <>
              <DebounceInput
                debounceTimeout={500}
                onChange={searchQuery}
                icon="search"
                placeholder="Search..."
              />
              <Button.Group>
                <Button>
                  Now is shown
                  {combineData.length}
                  {' '}
                  posts
                </Button>
                <Button onClick={loadPosts}>Reload all posts</Button>
              </Button.Group>
            </>
          )
      }

      {isLoading
        && (
          <Dimmer active>
            <Loader size="huge">LOADING.....</Loader>
          </Dimmer>
        )}
      {hasError
        && (
          <>
            <p>Error</p>
            <Button onClick={loadPosts}>Try Again</Button>
          </>
        )
      }
      {combineData.length === 0 && !hasError && !isInit
        ? (
          <>
            <p>No Posts yet </p>
            <Button
              onClick={loadPosts}
              content="Load"
              icon="right arrow"
              labelPosition="right"
            />
          </>
        )
        : (
          <Grid columns={3} divided>
            <Grid.Row>

              {combineData.map(post => (
                <Grid.Column key={post.id}>
                  <PostItem post={post} />
                </Grid.Column>
              ))}

            </Grid.Row>
          </Grid>
        )
      }
    </Container>
  );
}

const mapStateToProps = state => ({
  combineData: getPosts(state),
  isLoading: getStatusLoading(state),
  hasError: getError(state),
  isInit: getStatusIsInit(state),

});

const mapDispatchToProps = {
  startLoading: createActionStartLoading,
  handleError: createActionHandleError,
  handleSuccess: createActionHandleSuccess,
  loadDataFromServer: createActionloadTodos,
  searchQuery: createActionSearchQuery,

};

export default connect(mapStateToProps, mapDispatchToProps)(PostList);

PostList.propTypes = {
  combineData: PropTypes.arrayOf(PropTypes.any).isRequired,
  isLoading: PropTypes.bool.isRequired,
  hasError: PropTypes.bool.isRequired,
  loadDataFromServer: PropTypes.func.isRequired,
  searchQuery: PropTypes.func.isRequired,
  isInit: PropTypes.bool,
};

PostList.defaultProps = {
  isInit: false,
};
