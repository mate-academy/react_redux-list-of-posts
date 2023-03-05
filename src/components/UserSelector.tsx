import React, { useState } from 'react';
import classNames from 'classnames';
import useOnclickOutside from 'react-cool-onclickoutside';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { actions as authorActions } from '../features/author';
import { User } from '../types/User';

export const UserSelector: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const { users } = useAppSelector(state => state.users);
  const { author } = useAppSelector(state => state.author);
  const dispatch = useAppDispatch();

  const setUser = (user: User) => {
    dispatch(authorActions.setAuthor(user));
    setExpanded(false);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': expanded })}
      ref={useOnclickOutside(() => {
        setExpanded(false);
      })}
    >
      <div
        className="dropdown-trigger"
      >
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
            {author?.name || 'Choose a user'}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div
        className="dropdown-menu"
        id="dropdown-menu"
        role="menu"
      >
        <div
          className="dropdown-content"
        >
          {users.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              onClick={() => setUser(user)}
              className={classNames('dropdown-item', {
                'is-active': user.id === author?.id,
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
