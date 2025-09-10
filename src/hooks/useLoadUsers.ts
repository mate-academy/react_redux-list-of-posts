import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { loadUsers } from '../features/users/usersSlice';

export const useLoadUsers = () => {
  const { users, loading, error } = useAppSelector(state => state.users);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (users.length === 0 && !loading) {
      dispatch(loadUsers());
    }
  }, [users.length, loading, dispatch]);

  return { users, loading, error };
};
