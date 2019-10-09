/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import './User.css';
import Address from '../Address/Address';

const User = ({ user }) => {
  const {
    name, email, address,
  } = user;

  return (
    <div className="user">
      <h3>{name}</h3>
      <a href={`mailto:${email}`}>{email}</a>
      <Address address={address} />
    </div>
  );
};

User.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.shape({
      street: PropTypes.string,
      suite: PropTypes.string,
      city: PropTypes.string,
      zipcode: PropTypes.string,
    }),
  }).isRequired,
};

Address.defaultProps = {
  address: {},
};

export default User;
