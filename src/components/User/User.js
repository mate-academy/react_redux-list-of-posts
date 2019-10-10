import React from 'react';
import PropTypes from 'prop-types';
import './User.css';

function User({ user }) {
  const { name, email, address } = user;

  return (
    <div>
      <div>{name}</div>
      <div>{email}</div>
      <div>
        {`
          ${address.city},
          ${address.street},
          ${address.suite}
        `}
      </div>
    </div>
  );
}

User.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
  }).isRequired,
};
export default User;
