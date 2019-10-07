import { connect } from 'react-redux';
import Post from './Post';
import { deletePost } from '../../store/store';

const mapDispatchToProps = dispatch => ({
  deletePostFromPostList: postId => (
    dispatch(deletePost(postId))
  ),
});

export default connect(
  null,
  mapDispatchToProps
)(Post);
