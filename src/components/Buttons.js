import React from 'react';
import { Button, Input } from 'semantic-ui-react';
import PropTypes from 'prop-types';

const Buttons = ({ filterbutton, filterCanged, filter, loadData }) => (
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

Buttons.propTypes = {
  filterCanged: PropTypes.func.isRequired,
  filterbutton: PropTypes.func.isRequired,
  loadData: PropTypes.func.isRequired,
  filter: PropTypes.string,
};

Buttons.defaultProps = {
  filter: '',
};

export default Buttons;
