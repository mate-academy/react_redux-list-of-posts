import { connect } from 'react-redux';
import Search from './Search';
import {
  filterListOfPosts,
} from '../../store/store';

const mapStateToProps = state => ({
  filteredList: state.postListFromServer,
});

const mapDispatchToProps = dispatch => ({
  filterList: searchStr => dispatch(filterListOfPosts(searchStr)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
