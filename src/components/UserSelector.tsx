import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';
import { useAppSelector } from '../app/hooks';
import { fetchUsers, setAuthor } from '../features/usersSlice';
import { useDispatch } from 'react-redux';
import { fetchPosts } from '../features/postsSlice';

export const UserSelector: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const { users, author } = useAppSelector(state => state.users);
  const dispatch = useDispatch();

  const setAuthorOnClick = (user: User) => {
    dispatch(setAuthor(user));
    dispatch(fetchPosts(user.id));
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

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

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
              onClick={() => setAuthorOnClick(user)}
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
