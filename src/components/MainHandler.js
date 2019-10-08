import Main from './Main';
import { dataRequested, dataLoaded } from '../redux/actions';
import { connect } from 'react-redux';

function mapStateToProps(state) {
  return {
    dataRequested: state.dataRequested,
    postsList: state.postsList
  };
}

function mapDispatchToProps(dispatch) {
  return {
    request: () => dispatch(dataRequested()),
    loaded: () => dispatch(dataLoaded())
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
