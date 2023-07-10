import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import * as usersActions from '../features/users/usersSlice';
import * as authorActions from '../features/author/authorSlice';

export const UserSelector: React.FC = (
) => {
  const [expanded, setExpanded] = useState(false);
  const dispatch = useAppDispatch();
  const { users } = useAppSelector(state => state.users);
  const { author } = useAppSelector(state => state.author);

  useEffect(() => {
    dispatch(usersActions.init());
  }, []);

  const handleClick = (user: User) => {
    dispatch(authorActions.add(user));
  };

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
            {author?.name || 'Choose a user'}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => {
            const isActive = user.id === author?.id;

            return (
              <a
                key={user.id}
                href={`#user-${user.id}`}
                onClick={() => {
                  handleClick(user);
                }}
                className={classNames('dropdown-item', {
                  'is-active': isActive,
                })}
              >
                {user.name}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};
