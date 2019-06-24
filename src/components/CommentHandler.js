import { connect } from 'react-redux';
import { removeComment } from '../redux/actions';
import Comment from './Comment';

function mapStateToProps(state, ownProps) {
  return {
    name: ownProps.comment.name,
    email: ownProps.comment.email,
    body: ownProps.comment.body,
    articles: state.articles,
    commentIndex: ownProps.comment.id,
    postIndex: ownProps.postIndex,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    removeComment: (articles, postIndex, commentIndex) => dispatch(removeComment(articles, postIndex, commentIndex)),
  };
}

const CommentHandler = connect(mapStateToProps, mapDispatchToProps)(Comment);

export default CommentHandler;
