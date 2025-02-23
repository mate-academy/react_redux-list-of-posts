import React, { useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';
import { setAuthor } from '../features/author/authorSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchPosts } from '../features/posts/postSlice';
import { selectAuthor, selectUsers } from '../features/selectors';

export const UserSelector: React.FC = () => {
  const dispatch = useAppDispatch();
  const [expanded, setExpanded] = useState(false);
  const selectedUser = useAppSelector(selectAuthor);
  const users = useAppSelector(selectUsers);

  const setCurrentUser = (user: User) => {
    if (user.id !== selectedUser?.id) {
      dispatch(setAuthor(user));
      dispatch(fetchPosts(user.id));
    }
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
              onClick={() => {
                setCurrentUser(user);
              }}
              className={classNames('dropdown-item', {
                'is-active': user.id === selectedUser?.id,
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
