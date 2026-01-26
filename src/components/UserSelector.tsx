import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { loadUsers, usersSlice } from '../features/Users/UsersSlice';

export const UserSelector: React.FC = () => {
  const { users, selectedUser, loading, error } = useAppSelector(
    state => state.users,
  );
  const dispatch = useAppDispatch();
  const [expanded, setExpanded] = useState(false);
  const isListVisible = users.length >= 0 && !loading && !error;

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

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
          {loading && <p>User loading</p>}
          {error && <p>{error}</p>}
          {isListVisible &&
            users.map(user => (
              <a
                key={user.id}
                href={`#user-${user.id}`}
                onClick={() => {
                  dispatch(usersSlice.actions.selectUser(user));
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
