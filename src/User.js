import React from 'react';
import PropTypes from 'prop-types';

const User = ({ user }) => (
  <p className="post__author">
    <span>{user.name}</span>
    <br />
    <span>{user.email}</span>
    <br />
    <span>{user.address.city}</span>
  </p>
);

export default User;

User.propTypes = { user: PropTypes.arrayOf(PropTypes.object).isRequired };
