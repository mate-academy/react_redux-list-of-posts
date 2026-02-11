import React, { useEffect, useState, useCallback } from 'react';
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

  const toggleDropdown = useCallback((event: React.MouseEvent) => {
    event.stopPropagation();
    setExpanded(current => !current);
  }, []);

  useEffect(() => {
    if (!expanded) {
      return;
    }

    const handleDocumentClick = () => setExpanded(false);

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [expanded]);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': expanded })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-expanded={expanded}
          aria-controls="dropdown-menu"
          onClick={toggleDropdown}
        >
          <span>{selectedUser?.name || 'Choose a user'}</span>
          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.length === 0 && (
            <div className="dropdown-item is-disabled">No users available</div>
          )}
          {users.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              onClick={e => {
                e.preventDefault();
                onChange(user);
                setExpanded(false);
              }}
              className={classNames('dropdown-item', {
                'is-active': user.id === selectedUser?.id,
              })}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
