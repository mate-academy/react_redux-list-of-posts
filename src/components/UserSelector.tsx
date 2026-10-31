import React, { useEffect, useRef, useState } from 'react';

import type { User } from '../types/User';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchUsers } from '../features/users/usersSlice';

type Props = {
  value: User | null;
  onChange: (user: User | null) => void;
};

export const UserSelector: React.FC<Props> = ({ value, onChange }) => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(state => state.users.items);

  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, []);

  const handleSelect = (user: User) => {
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
          aria-expanded={isOpen}
          onClick={() => setIsOpen(!isOpen)}
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
              key={user.id}
              href={`#user-${user.id}`}
              className={`dropdown-item ${value?.id === user.id ? 'is-active' : ''}`}
              onClick={event => {
                event.preventDefault();
                handleSelect(user);
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
