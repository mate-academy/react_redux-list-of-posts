import { connect } from 'react-redux';
import Search from './Search';
import {
  filterListOfPosts,
  resetListOfPosts,
} from '../../store/store';

const mapDispatchToProps = dispatch => ({
  filterList: searchStr => dispatch(filterListOfPosts(searchStr)),
  resetPostList: () => dispatch(resetListOfPosts()),
});

export default connect(
  null,
  mapDispatchToProps
)(Search);
