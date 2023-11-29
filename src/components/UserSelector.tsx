/* eslint-disable max-len */
import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
// import { UserContext } from './UsersContext';
import { init } from '../features/users/usersSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { User } from '../types/User';

type Props = {
  value: User | null;
  onChange: (user: User) => void;
};

export const UserSelector: React.FC<Props> = ({
  // `value` and `onChange` are traditional names for the form field
  // `selectedUser` represents what actually stored here
  value: selectedUser,
  onChange,
}) => {
  // `users` are loaded from the API, so for the performance reasons
  // we load them once in the `UsersContext` when the `App` is opened
  // and now we can easily reuse the `UserSelector` in any form
  // const users = useContext(UserContext);
  const [expanded, setExpanded] = useState(false);

  const { value: users, isLoading, error } = useAppSelector((state: { users: { value: User[], isLoading: boolean, error: any } }) => state.users);
  const dispatch = useAppDispatch();

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

  useEffect(() => {
    dispatch(init());
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
          onClick={() => {
            setExpanded(current => !current);
          }}
        >
          <span>
            {isLoading ? 'Loading...' : (selectedUser?.name || 'Choose a user')}
            {error && ('Error')}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map((user: User) => (
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
