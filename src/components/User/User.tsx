import React, { FC } from 'react';

interface Props {
  user: User;
}


export const User: FC<Props> = ({ user }) => {
  const { name, email, address } = user;
  const { city, street, zipcode } = address

  return (
    <div className="user">
      <p>Autor contacts:</p>
      <p>{`name: ${name}, email: ${email}`}</p>
      <p>{`address: ${zipcode}, ${street}, ${city}`}</p>
    </div>
  );
};
