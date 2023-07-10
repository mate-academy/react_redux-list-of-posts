import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import * as usersActions from '../features/users/usersSlice';
import * as authorActions from '../features/author/authorSlice';
import { authorSelector, usersSelector } from '../helpers/funcState';

export const UserSelector: React.FC = (
) => {
  const [expanded, setExpanded] = useState(false);
  const dispatch = useAppDispatch();
  const { users } = useAppSelector(usersSelector);
  const { author } = useAppSelector(authorSelector);

  useEffect(() => {
    dispatch(usersActions.init());
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

  const changeClick = () => {
    setExpanded(current => !current);
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
          onClick={changeClick}
        >
          <span>
            {author?.name || 'Choose a user'}
          </span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => {
            const isActive = user.id === author?.id;
            const handleClick = () => {
              dispatch(authorActions.add(user));
            };

            return (
              <a
                key={user.id}
                href={`#user-${user.id}`}
                onClick={handleClick}
                className={classNames('dropdown-item', {
                  'is-active': isActive,
                })}
              >
                {user.name}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};
