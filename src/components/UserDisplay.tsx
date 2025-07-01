import React from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { User } from '../types/User';

type Props = {
  userId: number;
};

export const UserDisplay: React.FC<Props> = ({ userId }) => {
  const users = useSelector((state: RootState) => state.users.items);

  const user = users.find((u: User) => u.id === userId);

  if (!user) {
    return <span className="has-text-grey">Unknown user</span>;
  }

  return <span className="has-text-link">{user.name}</span>;
};
