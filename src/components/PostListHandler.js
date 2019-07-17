import { connect } from 'react-redux';
import PostList from './PostList';
import { load, getInputValue } from '../redux/actions';

function mapStateToProps(state) {
  return {
    requested: state.requested,
    data: state.data,
    inputValue: state.inputValue,
    search: state.search,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    buttonClick: () => dispatch(load()),
    getInputValue: event => dispatch(getInputValue(event.target.value)),
  };
}

const PostListHandler = connect(mapStateToProps, mapDispatchToProps)(PostList);
export default PostListHandler;
