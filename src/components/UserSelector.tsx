import React, { useEffect } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';
import { useAppDispatch } from '../app/hooks';
import {
  loadUsers,
  selectUsers,
  setExpanded,
} from '../features/users/usersSlice';
import { useSelector } from 'react-redux';
import { setAuthor } from '../features/author/authorSlice';

type Props = {
  value: User | null;
};

export const UserSelector: React.FC<Props> = ({ value: selectedUser }) => {
  const dispatch = useAppDispatch();
  const usersState = useSelector(selectUsers);

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

  useEffect(() => {
    if (!usersState.expanded) {
      return;
    }

    const handleDocumentClick = () => {
      dispatch(setExpanded(false));
    };

    document.addEventListener('click', handleDocumentClick);

    // eslint-disable-next-line consistent-return
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [usersState.expanded]);

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': usersState.expanded })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={e => {
            e.stopPropagation();
            dispatch(setExpanded(!usersState.expanded));
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
          {usersState.usersList.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              onClick={() => {
                dispatch(setAuthor(user));
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
