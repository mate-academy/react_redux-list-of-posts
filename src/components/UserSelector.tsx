import { FC, useEffect, useState } from 'react';
import classNames from 'classnames';

import { User } from '../types/User';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchUsers } from '../features/users/asyncActions';
import { usersSelector } from '../features/users/selectors';
import { setAuthor } from '../features/author/authorSlice';
import { authorSelector } from '../features/author/selectors';

export const UserSelector: FC = () => {
  const dispatch = useAppDispatch();
  const [expanded, setExpanded] = useState(false);

  const { users } = useAppSelector(usersSelector);
  const { author: selectedUser } = useAppSelector(authorSelector);

  const handleChangeUser = (user: User) => {
    dispatch(setAuthor(user));
  };

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

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
          onClick={e => {
            e.stopPropagation();
            setExpanded(current => !current);
          }}
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
