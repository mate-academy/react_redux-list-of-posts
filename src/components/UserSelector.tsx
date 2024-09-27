import React, { useCallback, useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { AppDispatch } from '../app/store';
import { useAppSelector } from '../app/hooks';
import { User } from '../types/User';
import { setUser } from '../features/authorSlice';
import { close } from '../features/selectedPostSlice';

export const UserSelector: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const author = useAppSelector(state => state.author.author);
  const users = useAppSelector(state => state.users.users);
  const [dropdownActive, setDropdownActive] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const handleClickOutside = useCallback((event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setDropdownActive(false);
    }
  }, []);

  useEffect(() => {
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [handleClickOutside]);

  const handleUserClick = (user: User) => {
    dispatch(setUser(user));
    setDropdownActive(false);
  };

  const toggleDropdown = () => {
    setDropdownActive(prev => !prev);
  };

  return (
    <div
      ref={dropdownRef}
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': dropdownActive })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          aria-expanded={dropdownActive}
          onClick={toggleDropdown}
        >
          <span>{Boolean(author) ? author?.name : 'Choose a user'}</span>
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
              onClick={() => {
                handleUserClick(user);
                dispatch(close());
              }}
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
