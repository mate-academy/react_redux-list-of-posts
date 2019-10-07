import { connect } from 'react-redux';
import CommentItem from './CommentItem';
import { deleteComment } from '../../store/store';

const mapDispatchToProps = dispatch => ({
  deleteCommentFromPost: (postId, commentId) => (
    dispatch(deleteComment(postId, commentId))
  ),
});

export default connect(
  null,
  mapDispatchToProps
)(CommentItem);
