import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';
import { useAppSelector } from '../app/hooks';

type Props = {
  currentUser: User | null;
  onSelectUser: (user: User) => void;
};

export const UserSelector: React.FC<Props> = ({
  currentUser,
  onSelectUser,
}) => {
  const users = useAppSelector(state => state.users.items);

  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => document.removeEventListener('click', handleClickOutside);
  }, []);

  const handleSelect = (user: User) => {
    onSelectUser(user);
    setIsOpen(false);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isOpen })}
      ref={ref}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          onClick={() => setIsOpen(prev => !prev)}
        >
          <span>{currentUser?.name || 'Choose a user'}</span>
          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              className={classNames('dropdown-item', {
                'is-active': user.id === currentUser?.id,
              })}
              onClick={() => handleSelect(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
