import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { getUsers, fetchUsers } from './Users/usersSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchUserPosts, getSelectedAuthor } from './Posts/userPostsSlicer';
import { User } from '../types/User';

export const UserSelector: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const dispatch = useAppDispatch();
  const users = useAppSelector(getUsers);
  const author = useAppSelector(getSelectedAuthor);
  const [selectedName, setSelectedName] = useState('');

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  useEffect(() => {
    if (!expanded) {
      return undefined;
    }

    const handleDocumentClick = () => {
      setExpanded(false);
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [expanded]);

  const selectHandler = (user: User) => {
    setSelectedName(user.name);
    dispatch(fetchUserPosts(user));
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
          onClick={() => {
            setExpanded(current => !current);
          }}
        >
          <span>
            {selectedName || 'Choose a user'}
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
              onClick={() => selectHandler(user)}
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
