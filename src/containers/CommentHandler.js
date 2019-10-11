import { connect } from 'react-redux';
import deleteCommentFromPost from '../store/functions/deleteComment';
import Comment from '../components/Comment/Comment';

const mapDispatchToProps = (dispatch, ownProps) => ({
  deleteCommentFromPost: () => dispatch(deleteCommentFromPost(ownProps.comment.id)),
});

export default connect(
  null,
  mapDispatchToProps
)(Comment);
