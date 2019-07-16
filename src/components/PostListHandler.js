import { connect } from 'react-redux';
import PostList from './PostList';
import { load, search } from '../redux/actions';

function mapStateToProps(state) {
  return {
    requested: state.requested,
    data: state.data,
    filtredPosts: state.filtredPosts,
    search: state.search,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    buttonClick: () => dispatch(load()),
    search: value => dispatch(search(value)),
  };
}

const PostListHandler = connect(mapStateToProps, mapDispatchToProps)(PostList);
export default PostListHandler;
