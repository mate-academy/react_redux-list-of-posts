import React from 'react';

function User(props) {
  return (
    <section>
      <span>{props.user.name}, </span>
      <span><a href="#">{props.user.email}</a>, </span>
      <span>adress: </span>
      <span>{props.user.address.street}, </span>
      <span>{props.user.address.suite}, </span>
      <span>{props.user.address.city}, </span>
      <span>{props.user.address.zipcode}</span>
    </section>
  );
}

export default User;
