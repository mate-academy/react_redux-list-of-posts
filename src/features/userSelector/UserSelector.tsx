import React, {
  useEffect,
  useState,
} from 'react';
import classNames from 'classnames';

import { NavLink } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUser, usersSelector } from './userSelectorSlice';
import Status from '../../enums/Status';

export const UserSelector: React.FC = () => {
  const dispatch = useAppDispatch();
  const { users, selectedUser, status } = useAppSelector(usersSelector);

  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!expanded) {
      return;
    }

    const handleDocumentClick = () => {
      setExpanded(false);
    };

    setTimeout(() => {
      document.addEventListener('click', handleDocumentClick);
    }, 0);

    // eslint-disable-next-line consistent-return
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [expanded]);

  return (
    <div
      className={classNames({
        dropdown: true,
        'is-active': expanded,
        'is-danger': true,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className={classNames({
            button: true,
            'is-danger': status === Status.Failed,
          })}
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => {
            if (status === Status.Idle) {
              setExpanded(current => !current);
            }
          }}
        >
          {status === Status.Loading && (
            <span>Loading...</span>
          )}

          {status === Status.Failed && (
            <span>Could not load users</span>
          )}

          {status === Status.Idle && (
            <span>{selectedUser?.name || 'Choose a user'}</span>
          )}

          <span className="icon is-small">
            {status === Status.Loading
              ? (
                <i
                  className="fa-solid fa-circle-notch fa-spin"
                  aria-hidden="true"
                />
              )
              : <i className="fas fa-angle-down" aria-hidden="true" />}
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => (
            <NavLink
              key={user.id}
              to={`/${user.id}`}
              replace
              onClick={() => dispatch(selectUser(user))}
              className={({ isActive }) => (
                classNames({
                  'dropdown-item': true,
                  'is-active': isActive,
                })
              )}
            >
              {user.name}
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};
