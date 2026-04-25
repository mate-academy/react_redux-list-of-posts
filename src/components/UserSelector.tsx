import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setSelectedUserId } from '../features/authorSlice';

export const UserSelector: React.FC = () => {
  const [selectIsOpen, setSelectIsOpen] = useState<boolean>(false);

  const dispatch = useAppDispatch();
  const { items: users } = useAppSelector(state => state.users);
  const { selectedUserId } = useAppSelector(state => state.author);

  const currentUser = users.find(user => user.id === selectedUserId) || null;

  useEffect(() => {
    if (!selectIsOpen) {
      return;
    }

    const handleOutClick = () => {
      setSelectIsOpen(false);
    };

    document.addEventListener('click', handleOutClick);

    return () => document.removeEventListener('click', handleOutClick);
  }, [selectIsOpen]);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': selectIsOpen })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={e => {
            e.stopPropagation();
            setSelectIsOpen(state => !state);
          }}
        >
          {currentUser ? (
            <span>{currentUser.name}</span>
          ) : (
            <span>Choose a user</span>
          )}

          <span className="icon is-small">
            <i
              className={classNames(
                'fas',
                !selectIsOpen ? 'fa-angle-down' : 'fa-angle-up',
              )}
              aria-hidden="false"
            />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              className={classNames('dropdown-item', {
                'is-active': selectedUserId === user.id,
              })}
              onClick={e => {
                e.preventDefault();
                e.stopPropagation();
                dispatch(setSelectedUserId(user.id));
                setSelectIsOpen(false);
              }}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
