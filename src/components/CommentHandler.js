import { connect } from 'react-redux';
import { deleteComment } from '../redux/actions';
import Comment from './Comment';

function mapStateToProps(state, ownProps) {
  return {
    comment: ownProps.comment,
    text: ownProps.comment.body,
    author: ownProps.comment.name,
    email: ownProps.comment.email,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    deleteComment: (id, postId) => dispatch(deleteComment(id, postId)),
  };
}

const CommentHandler = connect(
  mapStateToProps,
  mapDispatchToProps
)(Comment);

export default CommentHandler;
