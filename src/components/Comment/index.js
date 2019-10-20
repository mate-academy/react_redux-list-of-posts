import { connect } from 'react-redux';
import Comment from './Comment';
import { handleRemoveComment } from '../../store/actions';

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleRemoveComment: () => dispatch(handleRemoveComment(ownProps.comment.id)),
});

export default connect(
  null,
  mapDispatchToProps
)(Comment);
