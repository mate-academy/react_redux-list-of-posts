import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';
import { useAppSelector } from '../app/hooks';

type Props = {
  author: User | null;
  onChange: (user: User) => void;
};

export const UserSelector: React.FC<Props> = ({ author, onChange }) => {
  const [expanded, setExpanded] = useState(false);

  const users = useAppSelector(state => state.users.users);

  const handleDocumentClick = useCallback(() => {
    setExpanded(false);
  }, []);

  useEffect(() => {
    if (expanded) {
      document.addEventListener('click', handleDocumentClick);
    }

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [expanded, handleDocumentClick]);

  const handleToggleDropdown = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    setExpanded(current => !current);
  }, []);

  const handleUserSelect = useCallback(
    (user: User) => {
      onChange(user);
      setExpanded(false);
    },
    [onChange],
  );

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
          onClick={handleToggleDropdown}
        >
          <span>{author?.name || 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              onClick={() => handleUserSelect(user)}
              className={classNames('dropdown-item', {
                'is-active': user.id === author?.id,
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
