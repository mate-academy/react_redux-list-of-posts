import { connect } from 'react-redux';
import Post from './Post';
import { removePost } from '../redux/actions';

function mapStateToProps(state, ownProps) {
  return {
    filtredPosts: state.filtredPosts,
    posts: state.search ? state.filtredPosts : state.data,
    body: ownProps.post.body,
    title: ownProps.post.title,
    user: ownProps.post.user,
    comments: ownProps.post.comments,
    index: ownProps.post.id,
    search: state.search,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    removePost: (index, data) => dispatch(removePost(index, data)),
  };
}

const PostHandler = connect(mapStateToProps, mapDispatchToProps)(Post);
export default PostHandler;
