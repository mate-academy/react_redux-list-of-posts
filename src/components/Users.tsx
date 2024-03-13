import { useEffect } from 'react';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { RootState } from '../app/store';
import { User } from '../types/User';
import { fetchUsers } from '../utils/thunks/fetchUsers';
import { setSelectedUser } from '../features/users/usersSlice';

interface UsersProps {
  selectedUser: User | null;
}

export const Users: React.FC<UsersProps> = ({ selectedUser }) => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state: RootState) => state.users);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  return (
    <>
      {users.map(user => (
        <a
          key={user.id}
          href={`#user-${user.id}`}
          onClick={() => {
            dispatch(setSelectedUser(user));
          }}
          className={cn('dropdown-item', {
            'is-active': user.id === selectedUser?.id,
          })}
        >
          {user.name}
        </a>
      ))}
    </>
  );
};
