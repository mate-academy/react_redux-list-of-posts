import { connect } from 'react-redux';
import { LoadingPage } from './LoadingPage';

const Enhanced = connect(
  state => ({ isLoading: state.isLoading })
)(LoadingPage);

export {
  Enhanced as LoadingPage,
};
