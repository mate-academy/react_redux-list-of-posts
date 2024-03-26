/* eslint-disable consistent-return */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getUsersFromServ } from '../features/Users';
import { setAuthor } from '../features/AuthorSlice';
import { User } from '../types/User';
import { setSelectedPost } from '../features/SelectedPost';

export const UserSelector: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  const { users } = useAppSelector(state => state.users);
  const dispatch = useAppDispatch();
  const author = useAppSelector(state => state.author.author);

  useEffect(() => {
    dispatch(getUsersFromServ());

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
  }, [dispatch, expanded]);

  const toggleExpanded = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setExpanded(current => !current);
  };

  const handleUserSelect = (user: User) => {
    dispatch(setAuthor(user));
    dispatch(setSelectedPost(null));
    setExpanded(false);
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
          onClick={toggleExpanded}
        >
          <span>{author?.name || 'Choose a user'}</span>

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
              onClick={() => handleUserSelect(user)}
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
