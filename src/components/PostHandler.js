import connect from 'react-redux/es/connect/connect';
import { Post } from './Post';
import { removePost } from '../redux/actions';

function mapStateToProps(state) {
  return {
    comments: state.comments,
    usersMap: state.usersMap,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    postItemRemove: index => dispatch(removePost(index)),
  };
}

export const PostHandler = connect(mapStateToProps, mapDispatchToProps)(Post);
