import { connect } from 'react-redux';
import { postsListFetchData } from '../../store/postsList/actions';
import PostsList from './PostsList';

const mapStateToProps = state => ({
  posts: state.postsListState.postsList,
  isDataLoaded: state.postsListState.isDataLoaded,
  isLoading: state.postsListState.isLoading,
});

const mapDispatchToProps = dispatch => ({
  loadDataPosts: () => dispatch(postsListFetchData()),
});

export default connect(mapStateToProps, mapDispatchToProps)(PostsList);
