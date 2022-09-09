import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Loader } from './Loader';
import { selectUserId } from '../features/usersSlice';
import { selectedUserSelector } from '../utils/selectors';

export const UserSelector: React.FC = () => {
  const {
    users,
    usersIsLoading,
    usersIsError,
  } = useAppSelector(state => state.usersState);
  const selectedUser = useAppSelector(selectedUserSelector);

  const dispatch = useAppDispatch();

  const [expanded, setExpanded] = useState(false);

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
            {selectedUser?.name || 'Choose a user'}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {usersIsLoading && <Loader />}
          {usersIsError && (
            <div className="notification is-danger">
              ERROR
            </div>
          )}

          {users.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              onClick={() => {
                dispatch(selectUserId(user.id));
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
