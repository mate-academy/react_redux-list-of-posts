import React from 'react';
import { User } from '../types/User';

interface UserSelectorProps {
  value: User | null;
  onChange: (user: User | null) => void;
  users: User[]; // Add users array to populate the dropdown
}

export const UserSelector: React.FC<UserSelectorProps> = ({
  value,
  onChange,
  users,
}) => {
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedUserId = event.target.value;
    const selectedUser =
      users.find(user => user.id === Number(selectedUserId)) || null;

    onChange(selectedUser);
  };

  return (
    <select
      value={value?.id || ''}
      onChange={handleChange}
      className="select"
      data-cy="UserSelector"
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
