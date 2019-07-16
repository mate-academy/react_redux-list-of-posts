import { connect } from 'react-redux';
import Comment from './Comment';
import { removeComment } from '../redux/actions';

function mapStateToProps(state, ownProps) {
  return {
    comment: ownProps.comment,
    index: ownProps.index,
    posts: state.data,
    postIndex: ownProps.postIndex,
    search: state.search,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    removeComment: (index, posts, postIndex) => dispatch(removeComment(index, posts, postIndex)),
  };
}

const CommentHandler = connect(mapStateToProps, mapDispatchToProps)(Comment);
export default CommentHandler;
