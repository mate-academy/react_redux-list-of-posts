import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { getFromServerUsers } from '../features/users/usersAPI';
import { add } from '../features/currentUser';
import { selectCurrentUser, selectUsers } from '../app/store';

export const UserSelector = () => {
  const [expanded, setExpanded] = useState(false);
  const { users } = useAppSelector(selectUsers);
  const { currentrUser } = useAppSelector(selectCurrentUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getFromServerUsers());
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

  const currentUser = (user: User) => {
    dispatch(add(user));
  };

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
            {currentrUser?.name || 'Choose a user'}
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
              onClick={() => {
                currentUser(user);
              }}
              className={classNames('dropdown-item', {
                'is-active': user.id === currentrUser?.id,
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
