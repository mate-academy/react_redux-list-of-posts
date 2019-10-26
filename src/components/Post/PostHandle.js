import { connect } from 'react-redux';
import Post from './Post';
import { deletePost } from '../../store/index';

const mapDispatchYoProps = dispatch => ({
  deletePost: id => dispatch(deletePost(id)),
});

const EnhancedPost = connect(
  null,
  mapDispatchYoProps,
)(Post);

export default EnhancedPost;
