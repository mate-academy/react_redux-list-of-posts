import React from 'react';
import { Button, Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import {
  postsURL,
  filterAction,
  buttonFilter,
} from './redux/actions';
import {
  selectFilter,
} from './redux/selectors';

const ButtonsList = ({ filterbutton, filterCanged, filter, loadData }) => (
  <>
    <Input
      type="text"
      placeholder="What are you searching?"
      onChange={e => filterCanged(e.target.value)}
      value={filter}
    />
    <Button type="button" onClick={() => filterbutton('Post Text')}>
      Post Text
    </Button>
    <Button type="button" onClick={() => filterbutton('Post Title')}>
      Post Title
    </Button>
    <Button type="button" onClick={() => loadData(true)} color="facebook">
      Refresh
    </Button>
  </>
);

function mapState2Props(state) {
  return {
    filter: selectFilter(state),
  };
}

const mapDispatch2Props = dispatch => ({
  loadData: () => dispatch(postsURL()),
  filterCanged: value => dispatch(filterAction(value)),
  filterbutton: chosenFilter => dispatch(buttonFilter(chosenFilter)),
});

const Buttons = connect(
  mapState2Props,
  mapDispatch2Props,
)(ButtonsList);

ButtonsList.propTypes = {
  filterCanged: PropTypes.func.isRequired,
  filterbutton: PropTypes.func.isRequired,
  loadData: PropTypes.func.isRequired,
  filter: PropTypes.string,
};

ButtonsList.defaultProps = {
  filter: '',
};

export default Buttons;
