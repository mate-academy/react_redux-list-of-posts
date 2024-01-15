import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import * as usersSlice from '../features/usersSlice';
import * as authorSlice from '../features/authorSlice';

export const UserSelector: React.FC = () => {
  const { users } = useAppSelector(state => state.usersSlice);
  const { author: selectedUser } = useAppSelector(state => state.authorSlice);
  const dispatch = useAppDispatch();
  const [expanded, setExpanded] = useState(false);

  const handleUserClick = (user: User) => {
    dispatch(authorSlice.set(user));
  };

  useEffect(() => {
    dispatch(usersSlice.init());
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
          onClick={(e) => {
            e.stopPropagation();
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
        <div
          className="dropdown-content"
          style={{ height: '250px', overflow: 'auto' }}
        >
          {users.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              onClick={() => handleUserClick(user)}
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
