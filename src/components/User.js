import React from 'react';
import PropTypes from 'prop-types';

export function User(props) {
  const { user } = props;
  const { name, email } = user;
  return (
    <section>
      <h2>{name}</h2>
      <h5>{email}</h5>
    </section>
  );
}

User.propTypes = {
  user: PropTypes.instanceOf(Object).isRequired,
};
