import React, { createContext } from 'react';
import { User } from '../types/User';

export const UserContext = createContext<User[]>([]);

type Props = { children: React.ReactNode; users: User[] };

export const UsersProvider: React.FC<Props> = ({ children, users }) => {
  return <UserContext.Provider value={users}>{children}</UserContext.Provider>;
};
