import { connect } from 'react-redux';
import loadPostsAndUsers from '../store/functions/fetchPostsAndUsers';
import PostList from '../components/PostList/PostList';

const mapStateToProps = state => ({
  preparedPosts: state.preparedPosts,
  isLoading: state.isLoading,
  isLoaded: state.isLoaded,
  hasError: state.hasError,
});

const mapDispatchToProps = (dispatch, ownProps) => ({
  loadPostsAndUsers: () => dispatch(loadPostsAndUsers()),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList);
