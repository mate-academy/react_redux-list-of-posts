import { useEffect, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  fetchUsers,
  selectUsersItems,
  selectUsersLoaded,
  selectUsersError,
} from '../store/slices/usersSlice';

export const useUsers = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsersItems);
  const isLoaded = useAppSelector(selectUsersLoaded);
  const hasError = useAppSelector(selectUsersError);

  useEffect(() => {
    if (!isLoaded && !hasError) {
      dispatch(fetchUsers());
    }
  }, [dispatch, isLoaded, hasError]);

  return useMemo(
    () => ({
      users,
      isLoaded,
      hasError,
    }),
    [users, isLoaded, hasError],
  );
};
