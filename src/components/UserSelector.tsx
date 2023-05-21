import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { loadUsers } from '../features/usersSlice';
import { actions as authorActions } from '../features/authorSlice';
import {
  Loader,
} from './Loader';

export const UserSelector: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const { users, loading, hasError } = useAppSelector((state) => state.users);
  const { author } = useAppSelector((state) => state.author);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(loadUsers());
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
            setExpanded((current) => !current);
          }}
        >
          <span>{author?.name || 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {loading && <Loader />}

          {!loading && users.map((user) => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              onClick={() => {
                dispatch(authorActions.set(user));
              }}
              className={classNames('dropdown-item', {
                'is-active': user.id === author?.id,
              })}
            >
              {user.name}
            </a>
          ))}

          {hasError && (
            <div className="notification is-danger">
              Something went wrong
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
