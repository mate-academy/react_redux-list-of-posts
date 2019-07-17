import { connect } from 'react-redux';
import Post from './Post';
import { removePost } from '../redux/actions';

function mapStateToProps(state, ownProps) {
  return {
    posts: state.data,
    body: ownProps.post.body,
    title: ownProps.post.title,
    user: ownProps.post.user,
    comments: ownProps.post.comments,
    index: ownProps.post.id,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    removePost: (index, data) => dispatch(removePost(index, data)),
  };
}

const PostHandler = connect(mapStateToProps, mapDispatchToProps)(Post);
export default PostHandler;
