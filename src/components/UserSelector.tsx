import React, { useState } from 'react'; // Remove unused imports
import classNames from 'classnames';
import { User } from '../types/User';

type Props = {
  users: User[];
  value: User | null;
  onChange: (user: User) => void;
};

export const UserSelector: React.FC<Props> = ({
  users,
  value: selectedUser,
  onChange,
}) => {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="dropdown">
      <button className="button is-link" onClick={() => setExpanded(!expanded)}>
        {selectedUser ? selectedUser.name : 'Select a user'}
      </button>

      {expanded && (
        <div className="dropdown-menu">
          <div className="dropdown-content">
            {users.map(user => (
              <a
                key={user.id}
                className={classNames('dropdown-item', {
                  'is-active': user.id === selectedUser?.id,
                })}
                onClick={() => {
                  onChange(user);
                  setExpanded(false);
                }}
              >
                {user.name}
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
