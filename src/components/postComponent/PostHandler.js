import {connect} from 'react-redux';
import Post from './Post';
import { removeAction } from '../../redux/action';

function mapPropsToState(state, ownProps) {
  return {
    post: ownProps.post,
    commentList: ownProps.commentList
  };
};

function mapDispatchToProps(dispatch) {
  return {
    remove: (id) => dispatch(removeAction(id))
  }
};

const PostHandler = connect(mapPropsToState, mapDispatchToProps)(Post);
export default PostHandler;