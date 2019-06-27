import {connect} from 'react-redux';
import {deletePost} from '../redux/actions';
import Post from './Post';

function mapStateToProps(state, ownProps) {
  return {
    post: ownProps.element
  }
}

function mapDispatchToProps(dispatch) {
  return {
    deletePost: (id) => dispatch(deletePost(id))
  }
}

const PostHandler = connect(
  mapStateToProps,
  mapDispatchToProps
)(Post);

export default PostHandler;