import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { User } from '../types/User';
import * as authorActions from '../features/author/authorSlice';
import { Loader } from './Loader';

export const UserSelector: React.FC = () => {
  const dispatch = useAppDispatch();
  const { author: selectedUser } = useAppSelector(state => state.author);

  const { users, loading, error } = useAppSelector(state => state.users);
  const [expanded, setExpanded] = useState(false);

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

  useEffect(() => {
    if (!users.length) {
      dispatch(authorActions.fetchUsers());
    }
  }, [dispatch, users.length]);

  if (loading) {
    return (
      <div data-cy="UserSelector">
        <Loader />
      </div>
    );
  }

  if (error) {
    return (
      <div data-cy="UserSelector">
        <p>{error}</p>
      </div>
    );
  }

  const handleAuthorChange = (author: User) => {
    dispatch(authorActions.set(author));
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
                handleAuthorChange(user);
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
