import {connect} from 'react-redux';
import {removePost} from "../redux/actions";
import Post from "./Post";

function mapStateToProps(state) {
  return {};
}

function mapDispatchToProps(dispatch) {
  return {
    postRemoveClicked: (id) => dispatch(removePost(id))
  };
}

const PostHandler = connect(mapStateToProps, mapDispatchToProps)(Post);

export default PostHandler;
