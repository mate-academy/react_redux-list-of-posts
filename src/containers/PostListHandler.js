import { connect } from 'react-redux';
import loadPostsAndUsers from '../store/functions/fetchPostsAndUsers';
import PostList from '../components/PostList/PostList';
import { selectPosts } from '../store/selectors';

const mapStateToProps = state => ({
  preparedPosts: selectPosts(state),
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
