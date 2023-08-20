import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Loader } from './Loader';
import * as authorActions from '../features/authorSlice';

export const UserSelector: React.FC = () => {
  // `users` are loaded from the API, so for the performance reasons
  // we load them once in the `UsersContext` when the `App` is opened
  // and now we can easily reuse the `UserSelector` in any form
  const dispatch = useAppDispatch();
  const users = useAppSelector(state => state.users.users);
  const selectedUser = useAppSelector(state => state.author.author);
  const usersLoaded = useAppSelector(state => state.users.loaded);
  const usersHasErrors = useAppSelector(state => state.users.hasErrors);
  const [expanded, setExpanded] = useState(false);

  const onChange = (user: User) => {
    dispatch(authorActions.set(user));
  };

  useEffect(() => {
    if (!expanded) {
      return;
    }

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
  }, [expanded]);

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
          {!usersLoaded && (
            <Loader />
          )}

          {usersLoaded && !usersHasErrors && (
            users.map(user => (
              <a
                key={user.id}
                href={`#user-${user.id}`}
                onClick={() => {
                  onChange(user);
                }}
                className={classNames('dropdown-item', {
                  'is-active': user.id === selectedUser?.id,
                })}
              >
                {user.name}
              </a>
            ))
          )}

          {usersHasErrors && usersLoaded && (
            <div className="dropdown-item">
              <p className="has-text-danger">
                Failed to load users
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
