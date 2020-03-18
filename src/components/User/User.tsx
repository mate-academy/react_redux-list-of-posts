import React, { FC } from 'react';
import { UserInterface } from '../../constants';

interface Props {
  user: UserInterface;
}

export const User: FC<Props> = (props) => {
  const { name, address, email } = props.user;

  return (
    <div className="user">
      <p>Contact info:</p>
      <p>{`name: ${name}, email: ${email}`}</p>
      <p>{`address: ${address.zipcode}, ${address.street}, ${address.city}`}</p>
    </div>
  );
};
