import { connect } from 'react-redux';
import Comment from './Comment';
import { deleteComment } from '../../Store';

const mapDispatchToProps = (dispatch, ownProps) => ({
  deleteComment: () => dispatch(deleteComment(ownProps.id)),
});

const ImprovedComment = connect(
  null,
  mapDispatchToProps
)(Comment);

export {
  ImprovedComment as Comment,
};
