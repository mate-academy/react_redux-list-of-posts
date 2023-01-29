import {
  FC, MouseEvent, useEffect, useState,
} from 'react';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { User } from '../types/User';
import { getAllUsers, selectUser } from '../app/slices/userSlice';
import { setFormStatus, setSidebarStatus } from '../app/slices/uiSlice';

export const UserSelector: FC = () => {
  const { users, status, selectedUser } = useAppSelector(state => state.user);
  const dispatch = useAppDispatch();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  const onUserSelect = (usr: User) => {
    dispatch(selectUser(usr));
    dispatch(setFormStatus(false));
    dispatch(setSidebarStatus(false));
  };

  return (
    <div
      data-cy="UserSelector"
      className={cn('dropdown', {
        'is-active': isVisible,
      })}
    >
      {status === 'failed' && <p>Something went wrong</p>}
      {users?.length === 0 && <p>No user to select</p>}
      {users?.length !== 0 && status !== 'failed' && (
        <>
          <div className="dropdown-trigger">
            <button
              type="button"
              className="button"
              aria-haspopup="true"
              aria-controls="dropdown-menu"
              onClick={() => setIsVisible(prevState => !prevState)}
              onBlur={() => setIsVisible(false)}
            >
              {selectedUser ? (
                <span>{selectedUser?.name}</span>
              ) : (
                <span>Choose a user</span>
              )}

              <span className="icon is-small">
                <i
                  className="fas fa-angle-down"
                  aria-hidden="true"
                />
              </span>
            </button>
          </div>

          {status !== 'loading' && (
            <div
              className="dropdown-menu"
              id="dropdown-menu"
              role="menu"
            >
              <div className="dropdown-content">
                {users.map(u => (
                  <a
                    key={u.id}
                    href={`#/${String(u.id)}`}
                    className="dropdown-item"
                    onMouseDown={(e: MouseEvent) => {
                      e.preventDefault();
                      onUserSelect(u);
                    }}
                  >
                    {u.name}
                  </a>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
