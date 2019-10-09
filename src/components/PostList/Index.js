import { connect } from 'react-redux';
import PostList from './PostList';

const mapStateToProps = state => ({
  posts: state.filteredList,
});

export default connect(mapStateToProps)(PostList);
