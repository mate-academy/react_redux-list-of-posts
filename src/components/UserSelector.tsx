import React, { useEffect, useRef, useState } from 'react';
import { UserSelectorProps } from '../types/UserSelectorProps';

export const UserSelector: React.FC<UserSelectorProps> = ({
  users,
  selectedUserId,
  onSelect,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const selectedUser = users.find(u => u.id === selectedUserId);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={ref}
      data-cy="UserSelector"
      className={`dropdown ${isOpen ? 'is-active' : ''}`}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsOpen(prev => !prev)}
        >
          <span>{selectedUser ? selectedUser.name : 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => (
            <a
              href="#!"
              key={user.id}
              className={`dropdown-item ${selectedUserId === user.id ? 'is-active' : ''}`}
              onClick={e => {
                e.preventDefault();
                onSelect(user.id);
                setIsOpen(false);
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
