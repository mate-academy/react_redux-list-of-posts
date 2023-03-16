import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { actions as authorActions } from '../features/author/author';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { User } from '../types/User';

export const UserSelector: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const users = useAppSelector(state => state.users);
  const dispatch = useAppDispatch();
  const author = useAppSelector<null | User>(state => state.author);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleDocumentClick = (event: MouseEvent) => {
      if (
        dropdownRef.current
        && !dropdownRef.current.contains(event.target as Node)
      ) {
        setExpanded(false);
      }
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [expanded]);

  return (
    <div
      data-cy="UserSelector"
      ref={dropdownRef}
      className={classNames('dropdown', { 'is-active': expanded })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => {
            setExpanded(current => !current);
          }}
        >
          <span>
            {author ? author.name : 'Choose a user'}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>
      {expanded && (
        <div className="dropdown-menu" id="dropdown-menu" role="menu">
          <div className="dropdown-content">
            {users.users.map((user: User) => {
              return (
                <a
                  key={user.id}
                  href={`#user-${user.id}`}
                  onClick={() => {
                    dispatch(authorActions.setAuthor(user));
                    setExpanded(false);
                  }}
                  className={classNames('dropdown-item', {
                    'is-active': user.id === author?.id,
                  })}
                >
                  {user.name}
                </a>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};
