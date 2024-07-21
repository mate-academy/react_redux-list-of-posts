import React, { memo, useCallback, useEffect, useState } from 'react';
import cn from 'classnames';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import * as usersActions from '../features/users';
import { User } from '../types/User';

export const UserSelector: React.FC = memo(function UserSelectorComponent() {
  const dispatch = useAppDispatch();

  const { users, selectedUser } = useAppSelector(state => ({
    ...state.users,
    ...state.posts,
  }));

  const getSelectedUser = useCallback(
    (newUser: User) => () => {
      dispatch(usersActions.setSelectedUser(newUser));
    },
    [dispatch],
  );

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

  const isFocused = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    setExpanded(current => !current);
  };

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', { 'is-active': expanded })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={isFocused}
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
              onClick={getSelectedUser(user)}
              className={cn('dropdown-item', {
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
});
