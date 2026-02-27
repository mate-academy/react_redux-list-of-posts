import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getUsers } from '../api/users';
import * as usersActions from '../features/users';
import * as userSelectActions from '../features/userSelect';

export const UserSelector: React.FC = ({}) => {
  const dispatch = useAppDispatch();

  const users = useAppSelector(state => state.users);
  const userSelect = useAppSelector(state => state.userSelect);

  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    getUsers().then((usersFromServer: User[]) => {
      dispatch(usersActions.setUsers(usersFromServer));
    });
  }, []);

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
          <span>{userSelect?.name || 'Choose a user'}</span>

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
                dispatch(userSelectActions.setUser(user));
              }}
              className={classNames('dropdown-item', {
                'is-active': user.id === userSelect?.id,
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
