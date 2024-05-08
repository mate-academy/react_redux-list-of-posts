import React, { useEffect } from 'react';
import { User } from '../types/User';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import * as usersActions from '../features/users/usersSlice';

export const UserContext = React.createContext<User[]>([]);

type Props = {
  children: React.ReactNode;
};

export const UsersProvider: React.FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector(state => state.users);

  useEffect(() => {
    dispatch(usersActions.init());
  }, []);

  return <UserContext.Provider value={users}>{children}</UserContext.Provider>;
};
