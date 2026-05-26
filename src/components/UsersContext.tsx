import React, { useEffect } from 'react';
import { getUsers } from '../api/users';
import { User } from '../types/User';
import { useDispatch } from 'react-redux';
import { setUsers } from '../features/users/users-slice';

export const UserContext = React.createContext<User[]>([]);

type Props = {
  children: React.ReactNode;
};

export const UsersProvider: React.FC<Props> = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    getUsers()
      .then(dados => dispatch(setUsers(dados)))
      .catch();
  }, [dispatch]);

  return <>{children}</>;
};
