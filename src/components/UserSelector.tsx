import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getUsers } from '../api/users';
import { actions } from '../features/usersSlice';
import { actions as authorActions } from '../features/authorSlice';
import { actions as selectedPostActions } from '../features/selectedPostSlice';
import {
  fetchPostsAsync,
  actions as postActions,
} from '../features/postsSlice';
import { User } from '../types/User';

export const UserSelector: React.FC = () => {
  const users = useAppSelector(state => state.users.value);
  const author = useAppSelector(state => state.author.value);
  const selectedUser = useAppSelector(state => state.author.value);
  const dispatch = useAppDispatch();

  const [expanded, setExpanded] = useState(false);

  const onChange = (user: User) => {
    dispatch(authorActions.set(user));
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
    if (author) {
      dispatch(selectedPostActions.clear());
      dispatch(fetchPostsAsync(author.id));
    } else {
      dispatch(postActions.clear());
    }
  }, [author, dispatch]);

  useEffect(() => {
    getUsers().then((usersFromApi: User[]) => {
      dispatch(actions.set(usersFromApi));
    });
  }, [dispatch]);

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
                onChange(user);
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
