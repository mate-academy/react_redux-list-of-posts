import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import { User } from '../types/User';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import * as userAction from '../features/userSlice';
import * as postAction from '../features/postSlice';

export const UserSelector: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  const { users, selectedUser, } = useAppSelector(state => state.users);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!expanded) {
      return;
    };

    const handleDocumentClick = () => {
      setExpanded(false);
    };

    document.addEventListener('click', handleDocumentClick);

    // eslint-disable-next-line consistent-return
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };

  }, [expanded]);

  const chooseUser = (user: User) => {
    dispatch(userAction.selectedUser(user));
    dispatch(postAction.selectedPosts(null));
  }

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
          {users.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              onClick={() => chooseUser(user)}
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
