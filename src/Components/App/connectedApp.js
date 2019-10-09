import { connect } from 'react-redux';
import App from './App';
import { loadData } from '../../store/index';

const mapStateToProps = state => ({
  isLoading: state.isLoading,
  isLoaded: state.isLoaded,
  hasError: state.hasError,
});

const mapMethodsToprops = dispatch => ({
  loadData: () => dispatch(loadData()),
});

const ConnectedApp = connect(mapStateToProps, mapMethodsToprops)(App);

export default ConnectedApp;
