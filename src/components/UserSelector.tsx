import { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import * as usersActions from '../features/users/userS';
import { User } from '../types/User';

export const UserSelector = () => {
  const [focus, setFocus] = useState(false);
  const dropdown = useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();
  const { users, useR } = useAppSelector(state => state.users);

  useEffect(() => {
    const closeDropdown = (e: MouseEvent) => {
      if (dropdown.current
        && focus
        && !dropdown.current.contains(e.target as Node)) {
        setFocus(false);
      }
    };

    document.addEventListener('click', closeDropdown);

    return () => {
      document.removeEventListener('click', closeDropdown);
    };
  }, [focus]);

  const handleFocus = () => {
    if (focus) {
      setFocus(false);
    } else {
      setFocus(true);
    }
  };

  const handleChooseUser = (user: User) => {
    dispatch(usersActions.selectUser(user));
    setFocus(false);
  };

  return (
    <div
      data-cy="UserSelector"
      className={focus ? 'dropdown is-active' : 'dropdown'}
    >
      <div className="dropdown-trigger" ref={dropdown}>
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={handleFocus}
        >
          <span>
            {useR?.name || 'Choose a user'}
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
              onClick={() => handleChooseUser(user)}
              className={classNames('dropdown-item', {
                'is-active': user.id === useR?.id,
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
