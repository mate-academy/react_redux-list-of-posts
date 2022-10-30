import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';
import { setAuthor } from '../features/author/author';
import { useAppDispatch, useAppSelector } from '../app/hooks';

export const UserSelector: React.FC = () => {
  const { users } = useAppSelector(state => state.users);
  const { author } = useAppSelector(state => state.author);
  const dispatch = useAppDispatch();
  const [expanded, setExpanded] = useState(false);

  const authorSelectHandler = (user: User) => {
    dispatch(setAuthor(user));
  };

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
            setExpanded(current => !current);
          }}
        >
          <span>
            {author?.name || 'Choose a user'}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        {
          users && users.length > 0 && (
            <div className="dropdown-content">
              {users.map(user => (
                <a
                  key={user.id}
                  href={`#user-${user.id}`}
                  onClick={() => {
                    authorSelectHandler(user);
                  }}
                  className={classNames('dropdown-item', {
                    'is-active': user.id === author?.id,
                  })}
                >
                  {user.name}
                </a>
              ))}
            </div>
          )
        }
      </div>
    </div>
  );
};
