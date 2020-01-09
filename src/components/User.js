import React from 'react';
import PropTypes from 'prop-types';

// eslint-disable-next-line no-shadow
const User = ({ name, email, address }) => (
  <div>
    <h3>{`Author: ${name}`}</h3>
    <p>{`Email: ${email}`}</p>
    <p>{`City: ${address.city}`}</p>
  </div>
);

User.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  address: PropTypes.shape({
    city: PropTypes.string,
  }).isRequired,
};

export default User;
