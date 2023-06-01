import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchUsers } from '../features/usersSlice';
import { setAuthor } from '../features/authorSlice';

export const UserSelector: React.FC = () => {
  const dispatch = useAppDispatch();
  const users: User[] = useAppSelector(state => state.users.users);
  const selectedUser = useAppSelector(state => state.author.value);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  useEffect(() => {
    if (!isExpanded) {
      return undefined;
    }

    const handleDocumentClick = () => {
      setIsExpanded(false);
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [isExpanded]);

  const handleToggleMenu = () => {
    setIsExpanded(current => !current);
  }

  const handleOnUserClick = (user: User) => {
    dispatch(setAuthor(user));
  }

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isExpanded })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          disabled={!users.length}
          onClick={handleToggleMenu}
        >
          <span>
            {selectedUser?.name || 'Choose a user'}
          </span>

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
              onClick={() => handleOnUserClick(user)}
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
