import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useAppSelector, useAppDispatch } from '../app/hooks';
import { setAuthor, usersAsync } from '../features/users/usersSlice';

export const UserSelect: React.FC = () => {
  const { users, author: selectedUser } = useAppSelector(state => state.users);

  const dispatch = useAppDispatch();
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    dispatch(usersAsync());
  }, []);

  useEffect(() => {
    if (!expanded) {
      return;
    }

    const handleDocumentClick = () => {
      setExpanded(true);
    };

    document.addEventListener('click', handleDocumentClick);

    // eslint-disable-next-line consistent-return
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [expanded]);

  return (
    <div className={classNames('dropdown', { 'is-active': expanded })}>
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setExpanded(current => !current)}
        >
          <span>
            {selectedUser?.name || 'Choose a user'}
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
              onClick={() => dispatch(setAuthor(user))}
              className={classNames(
                'dropdown-item',
                { 'is-active': user.id === selectedUser?.id },
              )}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
