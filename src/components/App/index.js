import { connect } from 'react-redux';
import App from './App';
import { getDataFromApi, loaded, loading } from '../../store';

const mapDispatch2Props = dispatch => ({
  loaded: () => dispatch(loaded()),
  loading: () => dispatch(loading()),
  getDataFromApi: () => dispatch(getDataFromApi()),
});

function mapState2Props(state) {
  return {
    isLoaded: state.isLoaded,
    isLoading: state.isLoading,
    posts: state.posts,
  };
}

const Enhanced = connect(
  mapState2Props,
  mapDispatch2Props,
)(App);

export {
  Enhanced as App,
};
