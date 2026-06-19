import React, { useState } from 'react';
import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setAuthor } from '../features/author/authorSlice';

export const UserSelector: React.FC = () => {
  const dispatch = useAppDispatch();

  const users = useAppSelector(state => state.users);
  const selectedUser = useAppSelector(state => state.author);

  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', {
        'is-active': isOpen,
      })}
      tabIndex={0}
      onBlur={event => {
        if (!event.currentTarget.contains(event.relatedTarget as Node)) {
          setIsOpen(false);
        }
      }}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsOpen(current => !current)}
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
              className={classNames('dropdown-item', {
                'is-active': user.id === selectedUser?.id,
              })}
              onClick={event => {
                event.preventDefault();

                dispatch(setAuthor(user));
                setIsOpen(false);
              }}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
