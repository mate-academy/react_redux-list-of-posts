import { connect } from 'react-redux';
import Comment from './Comment';
import { deleteComment } from '../../store';

const CommentHandler = connect(
  null,
  (dispatch, ownProps) => ({
    deleteComment: () => dispatch(deleteComment(ownProps.comment.id)),
  }),
)(Comment);

export {
  CommentHandler as Comment,
};
