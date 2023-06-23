import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useDispatch } from 'react-redux';
import { useAppSelector } from '../app/hooks';
import { actions as userActions } from '../features/usersSlice';
import { actions as authorActions } from '../features/authorSlice';
import { getUsers } from '../api/users';

export const UserSelector: React.FC = () => {
  const dispatch = useDispatch();
  const { users } = useAppSelector(state => state.users);
  const { author: selectedUser } = useAppSelector(state => state.author);
  const [opened, setOpened] = useState(false);

  useEffect(() => {
    if (!opened) {
      return;
    }

    const handleClick = () => {
      setOpened(false);
    };

    document.addEventListener('click', handleClick);

    // eslint-disable-next-line consistent-return
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [opened]);

  useEffect(() => {
    getUsers()
      .then(usersFromServer => dispatch(userActions.set(usersFromServer)));
  }, []);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': opened })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => {
            setOpened(current => !current);
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
              onClick={() => dispatch(authorActions.set(user))}
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
