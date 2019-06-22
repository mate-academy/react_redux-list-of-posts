import { connect } from 'react-redux';
import { load, searchPosts } from '../redux/actions';
import PostList from './PostList';

function mapStateToProps(state) {
  return {
    postsRequested: state.requested,
    postsData: state.data,
    commentsData: state.comments,
    postSearched: state.search,
    searchedPosts: state.searchedPosts
  };
}

function mapDispatchToProps(dispatch) {
  return {
    buttonClicked: () => dispatch(load()),
    inputFilled: inputValue => dispatch(searchPosts(inputValue))
  }
}

const PostListHandler = connect(mapStateToProps, mapDispatchToProps)(PostList);

export default PostListHandler;
