import React, { useCallback, useEffect, useState } from 'react';
import classNames from 'classnames';
// import { UserContext } from './UsersContext';
// import { User } from '../types/User';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import * as usersActions from '../features/usersSlice';
import * as postsActions from '../features/postsSlice';

export const UserSelector: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const dispatch = useAppDispatch();
  const { users, user: select } = useAppSelector((state) => state.users);

  useEffect(() => {
    dispatch(usersActions.initUsers());
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

  const toChooseUser = useCallback((userId: number) => {
    dispatch(usersActions.addUser(userId));
    dispatch(postsActions.removePosts());
    dispatch(postsActions.initPosts(userId));
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
          onClick={() => {
            setExpanded((current) => !current);
          }}
        >
          <span>{select?.name || 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map((user) => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              onClick={() => {
                toChooseUser(user.id);
              }}
              className={classNames('dropdown-item', {
                'is-active': user.id === select?.id,
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
