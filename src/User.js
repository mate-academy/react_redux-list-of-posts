import React from "react";
import PropTypes from "prop-types";

const User = ({ user }) => (
  <div className="post__user">
    <p>name: {user.name}</p>
    <address>city: {user.address.city}</address>
    <address>street: {user.address.street} </address>
    <address>suite: {user.address.suite} </address>
    <a href={user.email}>email: {user.email}</a>
  </div>
);

User.propTypes = {
  user: PropTypes.shape({
    name: PropTypes.string,
    email: PropTypes.string,
    suite: PropTypes.string,
    address: PropTypes.object
  }).isRequired
};

export default User;
