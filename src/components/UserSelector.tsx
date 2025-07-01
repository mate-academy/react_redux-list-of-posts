import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { loadUsers } from '../features/users/usersSlice';
import { setAuthor } from '../features/author/authorSlice';

export const UserSelector: React.FC = () => {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector(state => state.users);
  const selectedUser = useAppSelector(state => state.author.current);
  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    dispatch(loadUsers());
  }, [dispatch]);

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
          onClick={e => {
            e.stopPropagation();
            setExpanded(current => !current);
          }}
        >
          <span>{selectedUser?.name || 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {items.map(item => (
            <a
              key={item.id}
              href={`#user-${item.id}`}
              onClick={() => {
                dispatch(setAuthor(item));
              }}
              className={classNames('dropdown-item', {
                'is-active': item.id === selectedUser?.id,
              })}
            >
              {item.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
