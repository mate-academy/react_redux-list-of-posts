import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { User } from '../../types/User';
import { useGetUsersQuery } from './usersApi';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUser, setUser } from './usersSlice';
import { setPost } from '../posts/postsSlice';

export const UserSelector: React.FC = () => {
  const { data: users } = useGetUsersQuery();
  const dispatch = useAppDispatch();

  const currentUser = useAppSelector(selectUser);
  const selectorRef = React.useRef<HTMLDivElement>(null);

  const handleUserSelect = (user: User) => {
    dispatch(setUser(user));
    dispatch(setPost(null));
  };

  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const handleDocumentClick = (e: MouseEvent) => {
      if (!selectorRef.current) {
        return;
      }

      if (!selectorRef.current?.contains(e.target as Node)) {
        setExpanded(false);
      }
    };

    document.addEventListener('click', handleDocumentClick);

    // eslint-disable-next-line consistent-return
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, []);

  return (
    <div
      ref={selectorRef}
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
            {currentUser?.name || 'Choose a user'}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users && users.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              onClick={() => {
                handleUserSelect(user);
                setExpanded(false);
              }}
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
