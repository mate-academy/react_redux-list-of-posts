import React, { useContext, useEffect, useState } from 'react';
import classNames from 'classnames';
import { UserContext } from './UsersContext';
import { User } from '../types/User';

type Props = {
  value: User | null;
  onChange: (user: User) => void;
};

export const UserSelector: React.FC<Props> = ({
  value: selectedUser,
  onChange,
}) => {
  const users = useContext(UserContext);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!expanded) {
      return;
    }

    const handleDocumentClick = () => setExpanded(false);

    document.addEventListener('click', handleDocumentClick);

    return () => document.removeEventListener('click', handleDocumentClick);
  }, [expanded]);

  const handleSelect = (e: React.MouseEvent, user: User) => {
    e.preventDefault();
    onChange(user);
    setExpanded(false);
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
            e.stopPropagation(); // предотвращаем закрытие при document.click
            setExpanded(prev => !prev);
          }}
        >
          <span data-cy={!selectedUser ? 'NoSelectedUser' : undefined}>
            {selectedUser?.name || 'Choose a user'}
          </span>
          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div
        className="dropdown-menu"
        id="dropdown-menu"
        role="menu"
        style={{ display: expanded ? 'block' : 'none' }} // <-- для Cypress
      >
        <div className="dropdown-content">
          {users.map(u => (
            <a
              key={u.id}
              href="#"
              className={classNames('dropdown-item', {
                'is-active': u.id === selectedUser?.id,
              })}
              onClick={e => handleSelect(e, u)}
            >
              {u.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
