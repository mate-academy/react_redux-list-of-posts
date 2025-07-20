import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { loadUsers } from '../features/users/usersSlice';
import { setAuthor } from '../features/authors/authorSlice';
import { User } from '../types/User';

export const UserSelector: React.FC = () => {
  const dispatch = useAppDispatch();

  const { items: users, loaded } = useAppSelector(state => state.users);
  const selectedUser = useAppSelector(state => state.author);

  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!loaded) {
      dispatch(loadUsers());
    }
  }, [dispatch, loaded]);

  useEffect(() => {
    if (!expanded) {
      return;
    }

    const close = () => setExpanded(false);

    document.addEventListener('click', close);

    return () => document.removeEventListener('click', close);
  }, [expanded]);

  const handleSelect = (user: User) => {
    dispatch(setAuthor(user));
    setExpanded(false);
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
          onClick={e => {
            e.stopPropagation();
            setExpanded(c => !c);
          }}
        >
          <span>{selectedUser?.name || 'Choose a user'}</span>
          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu">
        <div className="dropdown-content">
          {users.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              className={classNames('dropdown-item', {
                'is-active': user.id === selectedUser?.id,
              })}
              onClick={() => handleSelect(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
