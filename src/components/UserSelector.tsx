/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setAuthor } from '../app/slices/authorSlice'; // Перевірте шлях до slices

export const UserSelector: React.FC = () => {
  const { items: users, loaded } = useAppSelector(state => state.users);
  const authorId = useAppSelector(state => state.author.id);
  const dispatch = useAppDispatch();

  const selectedUser = users.find(user => user.id === authorId) || null;
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    if (!expanded) {
      return;
    }

    const handleDocumentClick = () => setExpanded(false);

    document.addEventListener('click', handleDocumentClick);

    return () => document.removeEventListener('click', handleDocumentClick);
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
          onClick={e => {
            e.stopPropagation();
            setExpanded(current => !current);
          }}
        >
          <span>{selectedUser?.name || 'Choose a user'}</span>
          <span className="icon is-small">
            <i className="fas fa-angle-down" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {loaded &&
            users.map(user => (
              <a
                key={user.id}
                href={`#user-${user.id}`}
                data-cy="User" // Важливо для тестів
                onClick={e => {
                  e.preventDefault();
                  dispatch(setAuthor(user.id));
                  setExpanded(false);
                }}
                className={classNames('dropdown-item', {
                  'is-active': user.id === authorId,
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
