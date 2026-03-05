// #region imports
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { set as setUsers } from '../features/users';
import { select as selectUser } from '../features/author';
import { getUsers } from '../api/users';
// #endregion

export const UserSelector: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(state => state.users);
  const selectedUser = useAppSelector(state => state.author);

  const [expanded, setExpanded] = useState(false);

  const onUserChange = (user: User) => {
    dispatch(selectUser(user));
  };

  useEffect(() => {
    getUsers().then(u => dispatch(setUsers(u)));

    if (!expanded) {
      return;
    }

    const handleDocumentClick = () => {
      setExpanded(false);
    };

    document.addEventListener('click', handleDocumentClick);

    // eslint-disable-next-line consistent-return
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [expanded, dispatch]);

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
        >
          <span>{selectedUser?.name || 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users?.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              onClick={() => {
                onUserChange(user);
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
