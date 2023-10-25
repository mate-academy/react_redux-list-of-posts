import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { init } from '../features/usersSlice';
import { Loader } from './Loader';
import * as authorSlice from '../features/authorSlice';

export const UserSelector: React.FC = () => {
  const { users, error, loading } = useAppSelector((state) => state.users);
  const { author } = useAppSelector(state => state);

  const dispatch = useAppDispatch();

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
    dispatch(init());
  }, []);

  if (error) {
    return <p>Something went wrong</p>;
  }

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
          {loading ? (
            <Loader />
          ) : (
            <>
              {users.map((user) => (
                <a
                  key={user.id}
                  href={`#user-${user.id}`}
                  onClick={() => {
                    dispatch(authorSlice.setAuthor(user));
                  }}
                  className={classNames('dropdown-item', {
                    'is-active': user.id === author?.id,
                  })}
                >
                  {user.name}
                </a>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
