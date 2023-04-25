import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { actions as authorActions } from '../features/users/UsersSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';

export const UserSelector: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const users = useAppSelector(state => state.users.users);
  const selectedUser = useAppSelector(state => state.users.selectedUser);
  const dispatch = useAppDispatch();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDocumentClick = useRef((e: any) => {
    if (!e.target.closest('.dropdown')) {
      setExpanded(false);
    }
  });

  useEffect(() => {
    if (!expanded) {
      return;
    }

    document.addEventListener('click', handleDocumentClick.current);

    // eslint-disable-next-line consistent-return
    return () => {
      document.removeEventListener('click', handleDocumentClick.current);
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
              onClick={() => {
                dispatch(authorActions.selectedUser(user));
                setExpanded(current => !current);
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
