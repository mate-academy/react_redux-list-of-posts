import { connect } from 'react-redux';
import PostList from './PostList';
import { load } from '../redux/actions';

function mapStateToProps(state) {
  return {
    articles: state.articles,
    requested: state.requested,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    load: () => dispatch(load()),
  };
}

const PostListHandler = connect(mapStateToProps, mapDispatchToProps)(PostList);

export default PostListHandler;
