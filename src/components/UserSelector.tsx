import React, { useState } from 'react';
import classNames from 'classnames';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import * as authorActions from '../features/authorSlice';

export const UserSelector: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const { users } = useAppSelector(state => state.users);
  const selectedUser = useAppSelector(state => state.author.author);
  const dispatch = useAppDispatch();

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
                dispatch(authorActions.setAuthor(user));
                setExpanded(false);
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
