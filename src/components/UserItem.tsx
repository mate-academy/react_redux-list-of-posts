import React from 'react';
import { User } from '../helpers/interface';

type Props = {
  user: User;
};
const UserItem: React.FC<Props> = ({ user: { name, email, address } }) => {
  return (
    <>
      <p>
        {name}
        {' '}
        {email}
        {' '}
        {address.street}
        {' '}
        {address.suite}
        {' '}
        {address.city}
        {' '}
        {address.zipcode}
      </p>
    </>
  );
};

export default UserItem;
