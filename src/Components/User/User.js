import React from 'react';
import PropTypes from 'prop-types';
import './User.css';

function User({ user }) {
  return (
    <div className="post__user">
      <p className="user__name">
        Name:
        {user.name}
      </p>
      <p className="user__username">
        Userame:
        {user.username}
      </p>
      <p className="user__email">
        Email:
        {user.email}
      </p>
      <p className="user__city">
        City:
        {user.address.city}
      </p>
    </div>
  );
}

User.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    username: PropTypes.string,
    email: PropTypes.string,
    address: PropTypes.object,
  }),
}.isRequaired;

export default User;
