/* eslint-disable no-shadow */
import React from 'react';
import PropTypes from 'prop-types';
import './User.css';

const User = ({ user }) => {
  const { email, name } = user;
  const {
    street,
    suite,
    city,
    zipcode,
  } = user.address;

  return (
    <div className="user">
      <div className="user__name">
        {name}
      </div>
      <div className="user__email">
        {email}
      </div>
      <div className="user__address">
        <div className="user__address-street">
          {street}
        </div>
        <div className="user__address-suite">
          {suite}
        </div>
        <div className="user__address-city">
          {city}
        </div>
        <div className="user__address-zipcode">
          {zipcode}
        </div>
      </div>
    </div>
  );
};

export default User;

User.propTypes = {
  user: PropTypes.shape({
    email: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    address: PropTypes.shape({
      street: PropTypes.string.isRequired,
      suite: PropTypes.string.isRequired,
      city: PropTypes.string.isRequired,
      zipcode: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
};
