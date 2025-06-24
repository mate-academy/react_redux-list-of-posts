import React, { useEffect } from 'react';
import { getUsers } from '../api/users';
import { User } from '../types/User';
import { useDispatch } from 'react-redux';
import { setUsers } from '../features/user/UserSlice';

export const UserContext = React.createContext<User[]>([]);

type Props = {
  children: React.ReactNode;
};

export const Users: React.FC<Props> = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    getUsers().then(users => dispatch(setUsers(users)));
  }, []);

  return <>{children}</>;
};
