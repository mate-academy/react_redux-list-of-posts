import { connect } from 'react-redux';
import Comment from './Comment';
import { deleteComment } from '../../store/index';

const mapDispatchYoProps = dispatch => ({
  deleteComment: (idComment, idPost) => dispatch(deleteComment(idComment, idPost)),
});

const EnhancedComment = connect(
  null,
  mapDispatchYoProps,
)(Comment);

export default EnhancedComment;
