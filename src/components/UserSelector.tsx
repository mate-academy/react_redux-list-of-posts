import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setAuthor } from '../features/authorSlice';
import { fetchUsers, selectUsers } from '../features/usersSlice';

export const UserSelector: React.FC = () =>
  {
    const selectedUser = useAppSelector(state => state.author);
    const users = useAppSelector(selectUsers);
    const [expanded, setExpanded] = useState(false);
    const dispatch = useAppDispatch();

    useEffect(() => {
      dispatch(fetchUsers());
    }, []);

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
                onClick={() => dispatch(setAuthor(user))}
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
