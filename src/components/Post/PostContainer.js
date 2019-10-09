import { connect } from 'react-redux';
import { deletePost } from '../../store/postsList/actions';
import Post from './Post';

const mapStateToProps = state => ({
  posts: state.postsListState.postsList,
});

const mapDispatchToProps = dispatch => ({
  deletePost: id => dispatch(deletePost(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Post);
