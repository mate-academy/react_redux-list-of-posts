import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { getUsers } from '../api/users';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { actions as usersActions } from '../features/usersSlice';
import { User } from '../types/User';
import { actions as authorActions } from '../features/authorSlice';

export const UserSelector: React.FC = () => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector(state => state.users);
  const { author } = useAppSelector(state => state.author);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    getUsers()
      .then(loadedData => {
        dispatch(usersActions.set(loadedData));
      });
  }, []);

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

  const onChange = (user: User) => {
    dispatch(authorActions.set(user));
  };

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
          {users.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              onClick={() => {
                onChange(user);
              }}
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
