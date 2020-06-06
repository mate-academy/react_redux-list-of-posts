
import React from 'react';
import { UserType } from '../types';
import { useSelector } from 'react-redux';
import { RootState } from '../store';

type PropsType = {
  id: number;
}

export const User: React.FC<PropsType> = ({ id }) => {
  const user = useSelector(
    (state: RootState) => state
      .users
      .filter((user: UserType) => user.id === id)[0])
  const { street, city, suite } = user.address;
  const { name, email } = user;

  return (
    <div>
      <span>
        <strong> Name: </strong>
        {name}
      </span>
      <span>
        <strong> Email: </strong>
        {email}
      </span>
      <span>
        <strong> Address: </strong>
        {city}, {street}, {suite}
      </span>
    </div>
  )
}
