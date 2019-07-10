import React from 'react';
import './user.css';

export default function User(props) {
  return (
    <section className="user">
      <h1>Author: {props.user.name}</h1>
      <ul>
        <li>email: {props.user.email}</li>
        <li>
        <span className="addressHead">Address Information</span>
          <ul className="address">
            <li>city: {props.user.address.city}</li>
            <li>street: {props.user.address.street} </li>
            <li>suite: {props.user.address.suite}</li>
            <li>zipcode: {props.user.address.zipcode}</li>
          </ul>
        </li>
      </ul>
    </section>
  )
}
