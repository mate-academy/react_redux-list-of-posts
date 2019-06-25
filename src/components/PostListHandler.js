import {connect} from 'react-redux';
import {load} from "../redux/actions";
import PostList from "./PostList";

function mapStateToProps(state) {
  return {
    posts: state.postList,
    requested: state.requested
  };
}

function mapDispatchToProps(dispatch) {
  return {
    buttonLoadClicked: () => dispatch(load())
  };
}

const PostListHandler = connect(mapStateToProps, mapDispatchToProps)(PostList);

export default PostListHandler;
