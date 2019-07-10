import {connect} from 'react-redux';
import CommentList from './CommentList.js';
import { removeCommentAction } from '../../redux/action';

function mapStateToProps(state, ownProps) {
  return {
    comments: ownProps.commentList,
  }
};

function mapDispatchToProps(dispatch) {
  return {
    removeComment: (id) => dispatch(removeCommentAction(id))
  }
}

const CommentListHandler = connect(mapStateToProps, mapDispatchToProps)(CommentList);

export default CommentListHandler;