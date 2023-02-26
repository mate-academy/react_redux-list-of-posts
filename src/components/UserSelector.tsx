import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { loadUsers } from '../features/users/usersSlice';
import { setSelectedPost } from '../features/selectedPost';
import { selectAuthor, setAuthor } from '../features/author';

export const UserSelector: React.FC = () => {
  const {
    items: users,
    hasError,
  } = useAppSelector(state => state.users);
  const author = useAppSelector(selectAuthor);
  const dispatch = useAppDispatch();
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    dispatch(loadUsers());
  }, []);

  useEffect(() => {
    if (!expanded) {
      return undefined; // fixes linter error
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
          onClick={() => {
            setExpanded(current => !current);
          }}
        >
          <span>
            {
              hasError
                ? 'Unable to get users'
                : author?.name || 'Choose a user'
            }
          </span>

          <span className="icon is-small">
            <i
              className={classNames('fas',
                {
                  'fa-angle-down': !hasError,
                  'fa-exclamation-triangle': hasError,
                })}
              aria-hidden="true"
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
              onClick={() => {
                dispatch(setAuthor(user));
                dispatch(setSelectedPost(null));
              }}
              className={classNames('dropdown-item', {
                'is-active': user.id === author?.id,
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
