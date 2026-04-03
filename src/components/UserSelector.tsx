import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { init } from '../features/users';
import { select } from '../features/user';
import { clear } from '../features/post';

export const UserSelector: React.FC = () => {
  const data = useAppSelector(state => state.users);
  const { user } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    dispatch(init());
  }, [dispatch]);

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
          onClick={e => {
            e.stopPropagation();
            setExpanded(current => !current);
          }}
        >
          <span>{user?.name || 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {data.users.map(u => (
            <a
              key={u.id}
              href={`#user-${u.id}`}
              onClick={() => {
                dispatch(select(u));
                dispatch(clear());
              }}
              className={classNames('dropdown-item', {
                'is-active': u.id === user?.id,
              })}
            >
              {u.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
