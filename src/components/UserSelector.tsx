import React, { useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setAuthor } from '../features/authorSlice';

export const UserSelector: React.FC = () => {
  const users = useAppSelector(state => state.users.items);
  const selectedUser = useAppSelector(state => state.author.author);
  const dispatch = useAppDispatch();
  const [expanded, setExpanded] = useState(false);

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
          onBlur={() => setExpanded(false)}
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
              onClick={() => setExpanded(false)}
              onMouseDown={() => dispatch(setAuthor(user))}
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
