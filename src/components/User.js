import React from 'react';
import PropTypes from 'prop-types';

const User = ({ currentUser }) => {
  const { name: userName, email, address } = currentUser;

  return (
    <>
      <p>{userName}</p>
      <p>
        @:
        {email}
      </p>
      <p>
        city:
        {address.city}
      </p>
    </>
  );
};

export default User;

User.propTypes = {
  currentUser: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.objectOf(PropTypes.any),
  }).isRequired,
};
