import { connect } from 'react-redux';
import { deleteComment } from '../store/store';
import Comment from './Comment';

const mapDispatchToProps = dispatch => ({
  deleteComment: id => dispatch(deleteComment(id)),
});

const enhancedComment = connect(
  null,
  mapDispatchToProps,
)(Comment);

export {
  enhancedComment as Comment,
}
