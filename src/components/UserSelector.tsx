import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import * as userReducer from '../features/users/user';
import * as usersActions from '../features/users/users';

export const UserSelector: React.FC = () => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector(state => state.users);

  useEffect(() => {
    dispatch(usersActions.init());
  }, []);
  const [expanded, setExpanded] = useState(false);
  const { user } = useAppSelector(state => state.user);

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
            setExpanded(current => !current);
          }}
        >
          <span>
            {user?.name || 'Choose a user'}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(person => (
            <a
              key={person.id}
              href={`#user-${person.id}`}
              onClick={() => {
                dispatch(userReducer.author(person.id));
              }}
              className={classNames('dropdown-item', {
                'is-active': person.id === user?.id,
              })}
            >
              {person.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
