import { connect } from 'react-redux';
import Post from './Post';
import { handleRemovePost } from '../../store/actions';

const mapDispatchToProps = (dispatch, ownProps) => ({
  handleRemovePost: () => dispatch(handleRemovePost(ownProps.post.id)),
});

export default connect(
  null,
  mapDispatchToProps
)(Post);
