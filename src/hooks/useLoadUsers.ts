import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { loadUsers } from '../features/users/usersSlice';

export const useLoadUsers = () => {
  const { users, loading, error } = useAppSelector(state => state.users);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadUsers());
  }, []);

  return { users, loading, error };
};
