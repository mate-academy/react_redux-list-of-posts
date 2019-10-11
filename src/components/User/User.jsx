import React from 'react';
import './User.scss';

function User({ user }) {
  const {
    name, username, email, address,
  } = user;

  return (
    <div className="user d-flex flex-column">
      <h2>{name}</h2>
      <p>{username}</p>
      <p>{email}</p>
      {address && (
        <div className="user__adress align-self-end mr-3">
          <p className="user__adress-street font-weight-bold">{address.street}</p>
          <p className="user__adress-suite font-weight-bold">{address.suite}</p>
          <p className="user__adress-city font-weight-bold">{address.city}</p>
          <p className="user__adress-zipcode font-weight-bold">{address.zipcode}</p>
        </div>
      )}
    </div>
  );
}

export default User;
