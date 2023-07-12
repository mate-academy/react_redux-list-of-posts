import { useEffect, useState } from 'react';
import classNames from 'classnames';
import * as usersActions from '../features/users/usersSlice';
import * as userActions from '../features/user/userSlice';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { Loader } from './Loader';

export const UserSelector = () => {
  const [expanded, setExpanded] = useState(false);
  const dispatch = useAppDispatch();
  const { users, error, loading } = useAppSelector(state => state.users);
  const { user: selectedUser } = useAppSelector(state => state.user);

  useEffect(() => {
    dispatch(usersActions.initUsers());
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

      {loading ? (
        <Loader />
      ) : (
        <>
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
                {selectedUser?.name || 'Choose a user'}
              </span>

              <span className="icon is-small">
                <i
                  className={classNames('fas',
                    {
                      'fa-angle-down': !expanded,
                      'fa-angle-up': expanded,
                    })}
                  aria-hidden="true"
                />
              </span>
            </button>
          </div>
          {!loading && !error && (
            <div className="dropdown-menu" id="dropdown-menu" role="menu">
              <div className="dropdown-content">
                {users.map(user => (
                  <a
                    key={user.id}
                    href={`#user-${user.id}`}
                    onClick={() => {
                      dispatch(userActions.set(user));
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
          )}
        </>
      )}
    </div>
  );
};
