import React from 'react';
import PropTypes from 'prop-types';
import './Address.css';

const Address = ({ address }) => {
  const {
    street, suite, city, zipcode,
  } = address;

  let showedAddress = null;
  if (Object.keys(address).length !== 0) {
    showedAddress = (
      <div className="address">
        <span>{street}</span>
        <span>{suite}</span>
        <span>{city}</span>
        <span>{zipcode}</span>
      </div>
    );
  }

  return showedAddress;
};

Address.propTypes = {
  address: PropTypes.shape({
    street: PropTypes.string,
    suite: PropTypes.string,
    city: PropTypes.string,
    zipcode: PropTypes.string,
  }),
};

Address.defaultProps = {
  address: {},
};

export default Address;
