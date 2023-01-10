import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectSelectedUser, selectUsers } from '../store/users/usersSelectors';
import { User } from '../types/User';
import { usersAction } from '../store/users/usersSlice';

export const UserSelector: React.FC = () => {
  const dispatch = useAppDispatch();

  const users = useAppSelector(selectUsers);
  const selectedUser = useAppSelector(selectSelectedUser);
  const [expanded, setExpanded] = useState(false);
  const ref = useRef<HTMLButtonElement | null>(null);

  const handleChangeUser = (user: User) => {
    dispatch(usersAction.changeAuthor(user));
  };

  const handleClick = (event: any) => {
    if ((event.target === ref.current
      || event.target.parentElement === ref.current) && !expanded) {
      return;
    }

    setExpanded(false);
  };

  useEffect(() => {
    window.addEventListener('click', handleClick);

    // eslint-disable-next-line consistent-return
    return () => {
      window.removeEventListener('click', handleClick);
    };
  }, []);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': expanded })}
    >
      <div className="dropdown-trigger">
        <button
          ref={ref}
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
          {users?.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              onClick={() => {
                handleChangeUser(user);
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
