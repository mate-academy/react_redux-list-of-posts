
import React from 'react';
import { AddressType } from '../types';

type PropsType = {
  name: string;
  email: string;
  address: AddressType;
}


export const User: React.FC<PropsType> = ({ name, email, address }) => {
  const {street, city, suite} = address;

  return (
    <div>
      <span><strong> Name: </strong>{name}</span>
      <span><strong> Email: </strong>{email}</span>
  <span> <strong> Address: </strong>{city}, {street}, {suite}</span>
    </div>
  )
}

