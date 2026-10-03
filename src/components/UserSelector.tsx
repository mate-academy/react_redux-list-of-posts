import React, { useEffect, useRef, useState } from 'react';

import { getUsers } from '../api/users';
import { User } from '../types/User';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setUsers } from '../features/users/usersSlice';

type Props = {
  value: User | null;
  onChange: (user: User | null) => void;
};

export const UserSelector: React.FC<Props> = ({ value, onChange }) => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(state => state.users);

  const [isOpen, setIsOpen] = useState(false);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (users.length === 0) {
      getUsers().then(usersFromServer => {
        dispatch(setUsers(usersFromServer));
      });
    }
  }, [dispatch, users.length]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  const handleUserSelect = (user: User) => {
    onChange(user);
    setIsOpen(false);
  };

  return (
    <div
      ref={dropdownRef}
      className={`dropdown ${isOpen ? 'is-active' : ''}`}
      data-cy="UserSelector"
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsOpen(current => !current)}
        >
          <span>{value ? value.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => (
            <a
              href="#"
              className={`dropdown-item ${
                value?.id === user.id ? 'is-active' : ''
              }`}
              key={user.id}
              onClick={event => {
                event.preventDefault();
                handleUserSelect(user);
              }}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
