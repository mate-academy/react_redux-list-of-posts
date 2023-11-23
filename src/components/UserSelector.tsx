import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import * as usersActions from '../features/users/users';
import * as currentUserActions from '../features/currentUser/currentUser';
import * as userPostsAction from '../features/userPosts/userPosts';
import { Loader } from './Loader';

export const UserSelector: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  const dispatch = useAppDispatch();
  const { users, loading } = useAppSelector(state => state.users);
  const { user } = useAppSelector(state => state.currentUser);

  useEffect(() => {
    dispatch(usersActions.init());
  }, []);

  const userPostsLoad = (userId: number) => {
    dispatch(userPostsAction.init(userId));
  };

  const onSetUser = (userId: number) => {
    dispatch(currentUserActions.init(userId));
    userPostsLoad(userId);
  };

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
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={(event) => {
            setExpanded(current => !current);

            event.stopPropagation();
          }}
        >
          <span>
            {user ? user.name : 'Choose a user'}
          </span>

          <span className="icon is-small">
            <i
              className={classNames(
                { 'fas fa-angle-up': expanded },
                { 'fas fa-angle-down': !expanded },
              )}
              aria-hidden="true"
            />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {loading ? (
            <Loader />
          ) : (
            <>
              {users.map(userData => (
                <a
                  id="dropdown-item"
                  key={userData.id}
                  href={`#user-${userData.id}`}
                  onClick={() => {
                    onSetUser(userData.id);
                  }}
                  className={classNames('dropdown-item', {
                    'is-active': userData.id === user?.id,
                  })}
                >
                  {userData.name}
                </a>
              ))}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
