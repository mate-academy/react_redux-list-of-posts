import { connect } from 'react-redux';
import Comment from './Comment';
import { deleteComment } from '../../store/postsList/actions';

const mapStateToProps = state => ({
  posts: state.postsListState.postsList,
});

const mapDispatchToProps = dispatch => ({
  deleteComment: id => dispatch(deleteComment(id)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Comment);
