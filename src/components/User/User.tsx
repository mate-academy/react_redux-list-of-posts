import React, { FC } from 'react';
import { UserInterface } from '../../constants';

interface Props {
  user: UserInterface;
}

export const User: FC<Props> = (props) => {
  const { user } = props;

  return (
    <div className="user">
      <p>Contact info:</p>
      <p>{`name: ${user.name}, email: ${user.email}`}</p>
      <p>{`address: ${user.address.zipcode}, ${user.address.street}, ${user.address.city}`}</p>
    </div>
  );
};
