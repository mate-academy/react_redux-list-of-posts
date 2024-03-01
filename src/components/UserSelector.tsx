import React, { useEffect, useState } from 'react';
import classNames from 'classnames';

import * as usersActions from '../features/users/usersSlice';
import * as authorAction from '../features/author/authorSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';

export const UserSelector: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const dispatch = useAppDispatch();
  const { users, error } = useAppSelector(state => state.users);
  const { author: selectedUser } = useAppSelector(state => state.author);

  useEffect(() => {
    dispatch(usersActions.init());
  }, [dispatch]);

  useEffect(() => {
    if (!expanded) {
      return;
    }

    // we save a link to remove the listener later
    const handleDocumentClick = () => {
      // we close the Dropdown on any click (inside or outside)
      // So there is not need to check if we clicked inside the list
      setExpanded(false);
    };

    document.addEventListener('click', handleDocumentClick);

    // eslint-disable-next-line consistent-return
    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
    // we don't want to listening for outside clicks
    // when the Dopdown is closed
  }, [expanded]);

  if (error) {
    return <h5>{error}</h5>;
  }

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
          <span>{selectedUser ? selectedUser.name : 'Choose a user'}</span>

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
              onClick={() => dispatch(authorAction.set(user))}
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
