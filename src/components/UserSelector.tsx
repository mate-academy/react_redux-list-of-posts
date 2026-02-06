import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from './App/hooks';
import { usersThunk } from './slicers/usersSlice';
import { authorSlice } from './slicers/authorSlice';

export const UserSelector: React.FC = () => {
  const dispatch = useAppDispatch();
  const [expanded, setExpanded] = useState(false);
  const { items: users } = useAppSelector(state => state.users);
  const { selectedUserId } = useAppSelector(state => state.author);
  const selectedUser = users.find(u => u.id === selectedUserId) || null;

  useEffect(() => {
    dispatch(usersThunk());
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
              onClick={(e) => {
                e.preventDefault();
                dispatch(authorSlice.actions.setAuthor(user.id));
                setExpanded(false);
              }}
              className={classNames('dropdown-item', {
                'is-active': user.id === selectedUserId,
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
