import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { changeAuthor } from '../features/author/author';
import { fetchUsers } from '../features/users/users';
import { User } from '../types/User';

export const UserSelector: React.FC = () => {
  // `users` are loaded from the API, so for the performance reasons
  // we load them once in the `UsersContext` when the `App` is opened
  // and now we can easily reuse the `UserSelector` in any form

  const { users } = useAppSelector(state => state.users);

  const [isExpanded, setExpanded] = useState(false);
  const { author: selectedUser } = useAppSelector(state => state.author);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!isExpanded) {
      return;
    }

    dispatch(fetchUsers());
    // we save a link to remove the listener later
    const handleDocumentClick = () => {
      // we close the Dropdown on any click (inside or outside)
      // So there is not need to check if we clicked inside the list
      setExpanded(false);
    };

    document.addEventListener('click', handleDocumentClick);

    // eslint-disable-next-line consistent-return
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  // we don't want to listening for outside clicks
  // when the Dopdown is closed
  }, [isExpanded]);

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
          onClick={() => {
            setExpanded(current => !current);
          }}
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
          {users?.map((user: User) => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              onClick={() => {
                dispatch(changeAuthor(user));
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
