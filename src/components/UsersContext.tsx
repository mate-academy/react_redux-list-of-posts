import React, { useEffect } from 'react';
import { getUsers } from '../api/users';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { addUsers } from '../features/users/usersSlice';
import { User } from '../types/User';

export const UserContext = React.createContext<User[]>([]);

type Props = {
  children: React.ReactNode;
};

export const UsersProvider: React.FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(state => state.users.listUsers);

  useEffect(() => {
    getUsers()
      .then((res) => dispatch(addUsers(res)));
  }, []);

  return (
    <UserContext.Provider value={users}>
      {children}
    </UserContext.Provider>
  );
};
