import { useEffect, useState } from 'react';
import classNames from 'classnames';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getUsers } from '../api/users';
import { setUsers } from '../features/usersSlice';
import { User } from '../types/User';

type Props = {
  selectedUser: User | null;
  setSelectedUser: (user: User) => void;
};

export const UserSelector: React.FC<Props> = ({
  selectedUser,
  setSelectedUser,
}) => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(state => state.users);

  const [isSelectingUser, setIsSelectingUser] = useState(false);

  useEffect(() => {
    getUsers()
      .then(usersFromServer => dispatch(setUsers(usersFromServer)));
  }, []);

  const handleUserSelector = () => {
    setIsSelectingUser(!isSelectingUser);
  };

  const handleUserSelect = (user: User) => {
    setSelectedUser(user);
    setIsSelectingUser(false);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', {
        'is-active': isSelectingUser,
      })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleUserSelector}
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
              onClick={() => handleUserSelect(user)}
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
