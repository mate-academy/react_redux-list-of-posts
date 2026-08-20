import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  selectAuthor,
  selectUsers,
  setAuthor,
} from '../features/users/usersSlice';
import { User } from '../types/User';

export const UserSelector: React.FC = () => {
  const dispatch = useAppDispatch();

  const users = useAppSelector(selectUsers);
  const selectedUser = useAppSelector(selectAuthor);

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

  const handleUserSelect = (user: User) => {
    dispatch(setAuthor(user));
    setExpanded(false);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': expanded })}
    >
      <button
        type="button"
        className="button"
        aria-haspopup="true"
        aria-controls="dropdown-menu"
        onClick={event => {
          event.stopPropagation();
          setExpanded(current => !current);
        }}
      >
        {selectedUser?.name || 'Choose a user'}

        <span className="icon is-small">
          <i className="fas fa-angle-down" aria-hidden="true" />
        </span>
      </button>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              onClick={event => {
                event.preventDefault();
                handleUserSelect(user);
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
