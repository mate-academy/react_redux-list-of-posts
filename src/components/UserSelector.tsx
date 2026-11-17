import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { fetchUsers } from '../features/users';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setCurrentUser } from '../features/currentUser';
import { User } from '../types/User';
import { setSelectedPost } from '../features/selectedPost';

export const UserSelector: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const { users } = useAppSelector(state => state.users);
  const { currentUser } = useAppSelector(state => state.currentUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
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

  const handleChangeUser = (user: User) => {
    dispatch(setCurrentUser(user));
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
          onClick={e => {
            e.stopPropagation();
            setExpanded(current => !current);
          }}
        >
          <span>{currentUser?.name || 'Choose a user'}</span>

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
              onClick={() => handleChangeUser(user)}
              className={classNames('dropdown-item', {
                'is-active': user.id === currentUser?.id,
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
