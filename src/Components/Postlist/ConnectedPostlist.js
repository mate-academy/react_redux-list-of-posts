import { connect } from 'react-redux';
import Postlist from './Postlist';
import { sortByTitle, sortByTitleReverse } from '../../store/index';

const mapStateToProps = state => ({
  filteredList: state.filteredList,
  isLoaded: state.isLoaded,
});

const mapMethodsToProps = dispatch => ({
  sortByTitle: () => dispatch(sortByTitle()),
  sortByTitleReverse: () => dispatch(sortByTitleReverse()),
});

const connectedPostlist = connect(mapStateToProps, mapMethodsToProps)(Postlist);

export default connectedPostlist;
