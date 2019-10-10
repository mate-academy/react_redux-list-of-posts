import { connect } from 'react-redux';
import App from './App';
import {
  getData,
  sortData,
  valueToSort,
  resetSort,
} from '../store/store';

const EnhancedApp = connect(
  state => ({
    sortedData: state.sortedData,
    isLoading: state.isLoading,
    userRequest: state.userRequest,
    usersNamesList: state.usersNamesList,
    originalData: state.originalData,
  }),
  dispatch => ({
    getData: () => dispatch(getData()),
    sortData: () => dispatch(sortData()),
    valueToSort: value => dispatch(valueToSort(value)),
    resetSort: () => dispatch(resetSort()),
  }),
)(App);

export {
  EnhancedApp as App,
};
