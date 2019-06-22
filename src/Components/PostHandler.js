import { connect } from 'react-redux';
import { removePost } from '../redux/actions';
import Post from './Post';

function mapStateToProps(state, ownProps) {
  return {
    id: ownProps.post.id,
    title: ownProps.post.title,
    body: ownProps.post.body,
    userName: ownProps.post.user.name,
    userEmail: ownProps.post.user.email,
    userAddress: ownProps.post.user.address.city,
    comments: state.comments
  };
}

function mapDispatchToProps(dispatch) {
  return {
    removePost: (id) => dispatch(removePost(id))
  }
}

const PostHandler = connect(mapStateToProps, mapDispatchToProps)(Post);

export default PostHandler;
