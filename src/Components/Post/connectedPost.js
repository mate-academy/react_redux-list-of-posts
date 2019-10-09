import { connect } from 'react-redux';
import { removePost } from '../../store/index';
import Post from './Post';

const mapMethodsToProps = dispatch => ({
  removePostItem: id => dispatch(removePost(id)),
});

const ConnectedPost = connect(null, mapMethodsToProps)(Post);

export default ConnectedPost;
