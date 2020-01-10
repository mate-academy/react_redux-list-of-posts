import { connect } from 'react-redux';
import { setPosts } from '../store/posts';
import { setIsLoading } from '../store/loading';
import { setQuery } from '../store/search';

import { getPosts, getIsLoading, getQuery } from '../store/index';

import PostList from './PostList';

const mapStateToProps = state => ({
  posts: getPosts(state),
  isLoading: getIsLoading(state),
  query: getQuery(state),
});

export default connect(
  mapStateToProps,
  {
    setPosts, setIsLoading, setQuery,
  }
)(PostList);
