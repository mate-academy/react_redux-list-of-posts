import React, { useEffect } from 'react';
import { getUsers } from '../api/users';
import { actions as userActions } from '../features/users/usersSlice';
import { useAppDispatch } from '../app/hooks';

type Props = {
  children: React.ReactNode;
};

export const UsersProvider: React.FC<Props> = ({ children }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    getUsers()
      .then(usersFromServer => dispatch(userActions.setUsers(usersFromServer)));
  }, [dispatch]);

  return (
    <>
      {children}
    </>
  );
};
