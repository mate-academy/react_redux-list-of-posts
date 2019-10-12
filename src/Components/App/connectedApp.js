import { connect } from 'react-redux';
import App from './App';
import { loadData } from '../../store/index';

const mapStateToProps = state => ({
  isLoading: state.isLoading,
  isLoaded: state.isLoaded,
  hasError: state.hasError,
});

const ConnectedApp = connect(mapStateToProps, { loadData })(App);

export default ConnectedApp;
