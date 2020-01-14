import React from 'react';
import './Users.css';

export const Users = ({ name, email, website }) => (
  <>
    <h6>{name}</h6>
    <h6>{email}</h6>
    <h6>{website}</h6>
  </>
);
