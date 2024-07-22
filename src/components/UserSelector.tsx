import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { User } from '../types/User';

type Props = {
  value: User | null;
  options: User[];
  onChange: (user: User) => void;
};

export const UserSelector: React.FC<Props> = ({
  value: selectedUser,
  options,
  onChange,
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
          {options.map(option => (
            <a
              key={option.id}
              href={`#user-${option.id}`}
              onClick={() => {
                onChange(option);
              }}
              className={classNames('dropdown-item', {
                'is-active': option.id === selectedUser?.id,
              })}
            >
              {option.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
