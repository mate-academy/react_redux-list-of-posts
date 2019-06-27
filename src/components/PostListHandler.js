import { connect } from 'react-redux';
import { loadData, updateInput } from '../redux/actions';
import PostList from './PostList';

function mapStateToProps(state) {
  return {
    items: state.items,
    requested: state.requested,
    inputValue: state.inputValue,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getData: () => dispatch(loadData()),
    updateInput: value => dispatch(updateInput(value)),
  };
}

const PostListHandler = connect(
  mapStateToProps,
  mapDispatchToProps
)(PostList);

export default PostListHandler;
