import { connect } from 'react-redux';
import App from './App';
import { getData, sortData, inputName, resetSort } from '../store/store';

const mapDispatchToProps = dispatch => ({
  getData: () => dispatch(getData()),
  sortData: () => dispatch(sortData()),
  inputName: value => dispatch(inputName(value)),
  resetSort: () => dispatch(resetSort()),
});

const EnhancedApp = connect(
  state => ({
    sortedData: state.sortedData,
    isLoading: state.isLoading,
    inputtedName: state.inputtedName,
    usersToDisplay: state.usersToDisplay,
    originalData: state.originalData,
  }),
  mapDispatchToProps,
)(App);

export {
  EnhancedApp as App,
};
