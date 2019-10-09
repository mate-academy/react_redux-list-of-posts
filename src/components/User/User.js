import React from 'react';
import PropTypes from 'prop-types';
import './User.css';

function User({ user }) {
  const { name, email } = user;
  const { city, street } = user.address;

  return (
    <div className="user">
      <h3 className="user__name">
        By
        {' '}
        {name}
      </h3>
      <p>{email}</p>
      <p>
        <span>
          city:&nbsp;
          {city}
        </span>
        <span>
          , street:&nbsp;
          {street}
        </span>
      </p>
      {/* <hr className="user__bottom-line" /> */}
    </div>
  );
}

const shape = PropTypes.shape({
  id: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  address: PropTypes.shape({
    street: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
  }),
});

User.propTypes = {
  user: shape.isRequired,
};

export default User;
