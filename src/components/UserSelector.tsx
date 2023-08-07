import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { getUsers } from '../api/users';
import { set } from '../features/usersSlice';
import { setAuthor } from '../features/authorSlice';
import { useAppSelector, useAppDispatch, useOutsideClick } from '../app/hooks';
import { User } from '../types/User';
import { setSelectedPost } from '../features/selectedPostSlice';
import { authorSelector } from '../api/selectors';

export const UserSelector: React.FC = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    getUsers()
      .then((usersFromServer) => {
        dispatch(set(usersFromServer));
      });
  }, []);
  const { users } = useAppSelector(state => state.users);
  const { author } = useAppSelector(authorSelector);
  const [expanded, setExpanded] = useState(false);

  const handleClickOutside = () => {
    setExpanded(false);
  };

  const ref = useOutsideClick(handleClickOutside);

  const handlerSelectUser = (user: User) => {
    dispatch(setAuthor(user));
    dispatch(setSelectedPost(null));
    setExpanded(false);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': expanded })}
      ref={ref}
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
        <div className="dropdown-content">
          {users.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              onClick={() => handlerSelectUser(user)}
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
