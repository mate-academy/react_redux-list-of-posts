import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getUsers } from '../api/users';
import { actions as usersActions } from '../features/usersSlice';
import { actions as authorActions } from '../features/authorSlice';
import { actions as selectedPostActions } from '../features/selectedPostSlice';
import { Loader } from './Loader';
import { User } from '../types/User';

export const UserSelector: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const dispatch = useAppDispatch();
  const { users, loading } = useAppSelector(state => state.users);
  const { author } = useAppSelector(state => state.author);

  const handleSelectUser = (user: User) => {
    dispatch(authorActions.setAuthor(user));
    dispatch(selectedPostActions.setSelectedPost(undefined));
  };

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

  useEffect(() => {
    dispatch(usersActions.setLoading(true));

    getUsers()
      .then(usersFromServer => {
        dispatch(usersActions.setUsers(usersFromServer));
      })
      .catch(() => {
        dispatch(usersActions.setError('Error'));
      })
      .finally(() => {
        dispatch(usersActions.setLoading(false));
      });
  }, [dispatch]);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': expanded })}
    >
      {loading && <Loader />}
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
              onClick={() => handleSelectUser(user)}
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
