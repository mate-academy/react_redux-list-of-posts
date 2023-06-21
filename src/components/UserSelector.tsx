import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import * as authorActions from '../features/authorSlice';
import * as usersActions from '../features/usersSlice';
import { getUsers } from '../api/users';

export const UserSelector: React.FC = () => {
  const dispatch = useAppDispatch();
  const [expanded, setExpanded] = useState(false);
  const users = useAppSelector(state => state.users);
  const { author } = useAppSelector(state => state.author);

  const getUsersFromServer = async () => {
    try {
      const usersFromServer = await getUsers();

      dispatch(usersActions.setUsers(usersFromServer));
    } catch {
      throw new Error(
        'Users are not loaded!',
      );
    }
  };

  useEffect(() => {
    getUsersFromServer();
  }, []);

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
              onClick={() => dispatch(authorActions.setAuthor(user))}
              className={classNames(
                'dropdown-item',
                {
                  'is-active': user.id === author?.id,
                },
              )}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
