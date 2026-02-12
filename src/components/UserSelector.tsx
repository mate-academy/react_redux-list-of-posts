import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getUsersAsync, selectUser } from '../features/users/usersSlice';
import { selectUsers } from '../app/selectors';

export const UserSelector = () => {
  const dispatch = useAppDispatch();

  const { users, selectedUser } = useAppSelector(selectUsers);

  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    dispatch(getUsersAsync());
  }, [dispatch]);

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

  const handleTriggerClick = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    setExpanded(current => !current);
  };

  const handleUserSelect = (user: User) => {
    dispatch(selectUser(user));
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
          onClick={handleTriggerClick}
        >
          <span>{selectedUser?.name || 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => {
            const isSelected = user.id === selectedUser?.id;

            return (
              <a
                key={user.id}
                href={`#user-${user.id}`}
                onClick={() => handleUserSelect(user)}
                className={classNames('dropdown-item', {
                  'is-active': isSelected,
                })}
              >
                {user.name}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};
