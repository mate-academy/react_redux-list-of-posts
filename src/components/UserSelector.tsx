/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { User } from '../types/User';

type Props = {
  users: User[];
  loading: boolean;
  onChange: (userId: number | null) => void;
};

export const UserSelector: React.FC<Props> = ({ users, loading, onChange }) => {
  return (
    <div className="field">
      <label className="label">Choose a user</label>
      <div className="control">
        <div className="select is-fullwidth">
          <select
            onChange={e => {
              const userId = e.target.value ? Number(e.target.value) : null;

              onChange(userId);
            }}
            disabled={loading}
          >
            <option value="">Choose a user</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};
