import React from 'react';
import './UserCard.css';

type Props = User;

export const UserCard: React.FC<Props> = ({ name, email, address }) => (
  <div className="post__autor user">
    <div className="user__info">
      <span className="user__info-decor">Autor: </span>
      {name}
    </div>
    <div className="user__info">
      <span className="user__info-decor">Email: </span>
      {email}
    </div>
    <div className="user__info">
      <span className="user__info-decor">Address: </span>
      {address.city}
      ,
      {' '}
      {address.street}
      ,
      {' '}
      {address.suite}
    </div>
  </div>
);
