import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import {
  assignAuthor,
  getUsersAsync,
  selectAuthor,
  selectUsers,
} from '../features/user/userSlice';

export const UserSelector: React.FC = () => {
  const users = useAppSelector(selectUsers);
  const selectedUser = useAppSelector(selectAuthor);
  const dispatch = useAppDispatch();

  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    dispatch(getUsersAsync());
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
    <div className="">
      {users && (
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
              {users.map(user => (
                <a
                  key={user.id}
                  href={`#user-${user.id}`}
                  onClick={() => {
                    dispatch(assignAuthor(user));
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
      )}
    </div>
  );
};
