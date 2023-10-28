import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { init } from '../features/usersSlice';
import { set as setAuthor } from '../features/authorSlice';

export const UserSelector: React.FC = () => {
  const users = useAppSelector(state => state.users.users);
  const author = useAppSelector(state => state.author.author);
  const dispatch = useAppDispatch();
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    dispatch(init());
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
            const { name, id } = user;

            return (
              <a
                key={id}
                href={`#user-${id}`}
                onClick={() => dispatch(setAuthor(user))}
                className={classNames('dropdown-item', {
                  'is-active': id === author?.id,
                })}
              >
                {name}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};
