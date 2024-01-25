import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { setAuthor } from '../features/author';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { User } from '../types/User';
import { setSelectedPost } from '../features/posts';

export const UserSelector: React.FC = () => {
  const { users } = useAppSelector(state => state.users);
  const [expanded, setExpanded] = useState(false);
  const { author } = useAppSelector(state => state.author);
  const dispatch = useAppDispatch();

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

  const handleNewUser = (user: User) => {
    dispatch(setAuthor(user));
    dispatch(setSelectedPost(null));
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
          onClick={(e) => {
            e.stopPropagation();
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
        <div className="dropdown-content">
          {users.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              onClick={() => {
                handleNewUser(user);
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
