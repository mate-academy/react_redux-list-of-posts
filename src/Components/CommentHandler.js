import { connect } from 'react-redux';
import { removeComment } from '../redux/actions';
import Comment from './Comment';

function mapStateToProps(state, ownProps) {
  return {
    title: ownProps.comment.name,
    body: ownProps.comment.body,
    email: ownProps.comment.email,
    id: ownProps.comment.id
  };
}

function mapDispatchToProps(dispatch) {
  return {
    removeComment: (id) => dispatch(removeComment(id))
  }
}

const CommentHandler = connect(mapStateToProps, mapDispatchToProps)(Comment);

export default CommentHandler;
