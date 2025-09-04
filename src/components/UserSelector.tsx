import { FC } from 'react';
import { User } from '../types/User';

interface UserSelectorProps {
  users: User[];
  selectedUser: User | null;
  onSelectUser: (user: User) => void;
}

export const UserSelector: FC<UserSelectorProps> = ({
  users,
  selectedUser,
  onSelectUser,
}) => {
  return (
    <select
      value={selectedUser?.id || ''}
      onChange={e => {
        const userId = Number(e.target.value);
        const user = users.find(u => u.id === userId);

        if (user) {
          onSelectUser(user);
        }
      }}
    >
      <option value="">Select a user</option>
      {users.map(user => (
        <option key={user.id} value={user.id}>
          {user.name}
        </option>
      ))}
    </select>
  );
};
