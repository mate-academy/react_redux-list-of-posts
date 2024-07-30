import React, { useEffect } from 'react';
import { User } from '../types/User';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchUsersAsync } from '../features/counter/features/userContextSlice';

export const UserContext = React.createContext<User[]>([]);

type Props = {
  children: React.ReactNode;
};

export const UsersProvider: React.FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(state => state.setUser.users);

  useEffect(() => {
    dispatch(fetchUsersAsync());
  }, [dispatch]);

  return <UserContext.Provider value={users}>{children}</UserContext.Provider>;
};
