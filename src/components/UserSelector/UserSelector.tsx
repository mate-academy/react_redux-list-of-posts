import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { User } from '../../types/User';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import * as usersActions from '../../features/usersSlice';

export const UserSelector: React.FC = () => {
  const { users, currentUser } = useAppSelector(state => state.users);
  const dispatch = useAppDispatch();

  const [expanded, setExpanded] = useState(false);

  const setUser = (user: User) => {
    dispatch(usersActions.setUser(user));
  };

  useEffect(() => {
    dispatch(usersActions.fetchUsers());
  }, []);

  useEffect(() => {
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
            {currentUser?.name || 'Choose a user'}
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
              onClick={() => {
                setUser(user);
              }}
              className={classNames('dropdown-item', {
                'is-active': user.id === currentUser?.id,
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
