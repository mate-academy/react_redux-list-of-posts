import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import * as usersActions from '../features/users/usersSlice';
import * as authorActions from '../features/author/authorSlice';

type Props = {
  value: User | null;
};

export const UserSelector: React.FC<Props> = ({
  value: selectedUser,
}) => {
  const { users } = useAppSelector(state => state.users);
  const [isExpanded, setIsExpanded] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(usersActions.init());
  }, []);

  useEffect(() => {
    if (!isExpanded) {
      return;
    }

    const handleDocumentClick = () => {
      setIsExpanded(false);
    };

    document.addEventListener('click', handleDocumentClick);

    // eslint-disable-next-line consistent-return
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [isExpanded]);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isExpanded })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => {
            setIsExpanded(current => !current);
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
                dispatch(authorActions.set(user));
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
