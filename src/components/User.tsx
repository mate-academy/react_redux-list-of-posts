import React from 'react';

type Props = {
  postUser: User;
};

export const User: React.FC<Props> = ({ postUser }) => {
  const { name } = postUser;

  return (
    <>
      <li className="user__item">
        <span className="user__name">{name}</span>
      </li>
    </>
  );
};
