import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { selectUsers, setUsersAsync } from '../../features/users/usersSlice';
import { setSelectedPost } from '../../features/selectedPost/selectedPostSlice';
import {
  selectAuthor,
  setSelectedAuthor,
} from '../../features/author/authorSlice';

export const UserSelector: React.FC = () => {
  // `users` are loaded from the API, so for the performance reasons
  // we load them once in the `UsersContext` when the `App` is opened
  // and now we can easily reuse the `UserSelector` in any form
  // const users = useContext(UserContext);
  const usersData = useAppSelector(selectUsers);
  const selectedAuthor = useAppSelector(selectAuthor);
  const dispatch = useAppDispatch();
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    const getUserOnLoad = async () => {
      await dispatch(setUsersAsync());
    };

    getUserOnLoad();
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
            {selectedAuthor?.name || 'Choose a user'}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {usersData.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              onClick={() => {
                dispatch(setSelectedAuthor(user));
                dispatch(setSelectedPost(null));
              }}
              className={classNames('dropdown-item', {
                'is-active': user.id === selectedAuthor?.id,
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
