import React, { useState } from 'react';
import classNames from 'classnames';

import { useAppSelector, useAppDispatch } from '../app/hooks';
import {
  selectUsers,
  selectSelectedUser,
  setSelectedUser,
} from '../features/users/usersSlice';

import { User } from '../types/User';

export const UserSelector: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  const users = useAppSelector(selectUsers);
  const selectedUser = useAppSelector(selectSelectedUser);
  const dispatch = useAppDispatch();

  const handleChange = (user: User) => {
    dispatch(setSelectedUser(user));
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
            e.stopPropagation();
            setExpanded(current => !current);
          }}
          onBlur={() => setExpanded(false)}
        >
          <span>{selectedUser?.name || 'Choose a user'}</span>

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
                handleChange(user);
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
