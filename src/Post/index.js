import { connect } from 'react-redux';
import { deletePost } from '../store/store';
import Post from './Post';

const mapDispatchToProps = dispatch => ({
  deletePost: id => dispatch(deletePost(id)),
});

const enhancedPost = connect(
  null,
  mapDispatchToProps,
)(Post);

export {
  enhancedPost as Post,
}
