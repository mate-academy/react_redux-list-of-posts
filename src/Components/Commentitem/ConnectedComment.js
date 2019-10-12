import { connect } from 'react-redux';
import { removeComment } from '../../store/index';
import CommentItem from './CommentItem';

const mapMethodsToProps = dispatch => ({
  removeComment: id => dispatch(removeComment(id)),
});

const ConnectedComment = connect(null, mapMethodsToProps)(CommentItem);

export default ConnectedComment;
