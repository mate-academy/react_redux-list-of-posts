import React, { useEffect } from 'react';
import { getUsers } from '../api/users';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selecteUsers } from '../features/users/seletors';
import { addUsers } from '../features/users/usersSlice';
import { User } from '../types/User';

export const UserContext = React.createContext<User[]>([]);

type Props = {
  children: React.ReactNode;
};

export const UsersProvider: React.FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selecteUsers);

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
