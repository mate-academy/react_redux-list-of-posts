import React from 'react';
import PropTypes from 'prop-types';

const UserEmail = ({ email }) => (
  <>
    <p className="user__email">
    Email:
      {email}
    </p>
  </>
);

UserEmail.propTypes = {
  email: PropTypes.string,
}.isRequaired;

export default UserEmail;
