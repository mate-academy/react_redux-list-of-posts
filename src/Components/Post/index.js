import { connect } from 'react-redux';
import Post from './Post';
import { deletePost } from '../../Store';

const mapDispatchToProps = (dispatch, ownProps) => ({
  deletePost: () => dispatch(deletePost(ownProps.id)),
});

const ImprovedPost = connect(
  null,
  mapDispatchToProps,
)(Post);

export {
  ImprovedPost as Post,
};
