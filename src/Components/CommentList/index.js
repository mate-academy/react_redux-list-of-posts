import { connect } from 'react-redux';
import CommentList from './CommentList';

const ImprovedCommentList = connect(
  (state, ownProps) => ({
    commentsList: state.comments.filter(comment => (
      comment.postId === ownProps.id
    )),
  })
)(CommentList);

export {
  ImprovedCommentList as CommentList,
};
