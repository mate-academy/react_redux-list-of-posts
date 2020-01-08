import { connect } from 'react-redux';
import deletePostFromList from '../store/functions/deletePost';
import Post from '../components/Post/Post';

const mapDispatchToProps = (dispatch, ownProps) => ({
  deletePostFromList: () => dispatch(deletePostFromList(ownProps.post.id)),
});

export default connect(
  null,
  mapDispatchToProps
)(Post);
