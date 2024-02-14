import React, { useState } from 'react';
import cn from 'classnames';
import { User } from '../types/User';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setAuthor } from '../features/authorSlice';

export const UserSelector: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(state => state.users);
  const selectedUser = useAppSelector(state => state.author);
  const [isDropdownActive, setIsDropdownActive] = useState(false);

  const handleNewUserSelected = (user: User) => {
    setIsDropdownActive(false);

    if (selectedUser?.id !== user.id) {
      dispatch(setAuthor(user));
    }
  };

  const handleDropdownBlur = (
    event: React.FocusEvent<HTMLButtonElement, Element>,
  ) => {
    if (event.relatedTarget?.className !== 'dropdown-item') {
      setIsDropdownActive(false);
    }
  };

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', {
        'is-active': isDropdownActive,
      })}
    >
      <div className="dropdown-trigger">
        <button
          onBlur={handleDropdownBlur}
          onClick={() => setIsDropdownActive(!isDropdownActive)}
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
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
              href={`#user-${user.id}`}
              className={cn('dropdown-item', {
                'is-active': selectedUser?.id === user.id,
              })}
              key={user.id}
              onClick={() => handleNewUserSelected(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
