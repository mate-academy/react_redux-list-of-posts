import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import {
  fetchUsers,
  selectUsers,
  selectIsLoading,
  selectError,
} from '../slices/usersSlice';
import { User } from '../types/User';

type Props = {
  value: User | null;
  onChange: (user: User) => void;
};

export const UserSelector: React.FC<Props> = ({
  value: selectedUser,
  onChange,
}) => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsers);
  const isLoading = useAppSelector(selectIsLoading);
  const error = useAppSelector(selectError);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

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
          <span>{selectedUser?.name || 'Choose a user'}</span>
          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {isLoading && <p>Loading...</p>}
          {error && <p className="notification is-danger">{error}</p>}
          {!isLoading &&
            !error &&
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
            ))}
        </div>
      </div>
    </div>
  );
};
