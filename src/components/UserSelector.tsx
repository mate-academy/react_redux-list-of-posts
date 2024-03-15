/* eslint-disable consistent-return */
/* eslint-disable operator-linebreak */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';

type Props = {
  value: User | null;
  onChange: (user: User | null) => void; // Allow null to clear the selection
  users: User[] | null;
};

export const UserSelector: React.FC<Props> = ({
  value: selectedUser,
  onChange,
  users,
}) => {
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!expanded) {
      return;
    }

    const handleDocumentClick = () => {
      setExpanded(false);
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [expanded]);

  // Function to handle user selection and clear comments
  const handleUserChange = (user: User) => {
    onChange(user); // Trigger the callback with the new user
    setExpanded(false); // Collapse the dropdown
  };

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
          aria-controls="dropdown-menu"
          onClick={e => {
            e.stopPropagation();
            setExpanded(current => !current);
          }}
        >
          <span>{selectedUser?.name || 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users &&
            users.map(user => (
              <a
                key={user.id}
                href={`#user-${user.id}`}
                onClick={e => {
                  e.preventDefault(); // Prevent the default anchor behavior
                  handleUserChange(user);
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
