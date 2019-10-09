import { connect } from 'react-redux';
import Post from './Post';
import { deletePost } from '../../store';

const PostHandler = connect(
  null,
  (dispatch, ownProps) => ({
    deletePost: () => dispatch(deletePost(ownProps.post.id)),
  }),
)(Post);

export {
  PostHandler as Post,
};
