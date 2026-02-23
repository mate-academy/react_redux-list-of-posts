import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../app/hooks';
import { RootState } from '../app/store';
import { setAuthor } from '../features/author/authorSlice';
import { User } from '../types/User';

export const UserSelector: React.FC = () => {
  const dispatch = useAppDispatch();

  // Select users from Redux store
  const users = useSelector(
    (state: RootState) => state.users.items || [],
  ) as User[];
  const selectedUser = useSelector(
    (state: RootState) => state.author as User | null,
  );

  const [expanded, setExpanded] = useState(false);

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
            setExpanded(prev => !prev);
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
          {users?.length > 0 ? (
            users.map((user: User) => (
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
            ))
          ) : (
            <p className="dropdown-item">No users available</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserSelector;
