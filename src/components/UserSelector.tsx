import React, { useEffect } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { initFetch, selectUsers, setExpanded } from '../slices/UsersSlice';
import { initAuthor, selectAuthor } from '../slices/AuthorSlice';

export const UserSelector: React.FC = () => {
  const { expanded, users } = useAppSelector(selectUsers);
  const { author: selectedUser } = useAppSelector(selectAuthor);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (expanded) {
      dispatch(initFetch());
    }

    if (!expanded) {
      return;
    }

    const handleDocumentClick = () => {
      dispatch(setExpanded());
    };

    document.addEventListener('click', handleDocumentClick);

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [dispatch, expanded]);

  const handleClickDropdown = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.stopPropagation();
    dispatch(setExpanded());
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
          onClick={e => handleClickDropdown(e)}
        >
          <span>{selectedUser?.name || 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users?.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              onClick={() => {
                dispatch(initAuthor(user));
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
    </div>
  );
};
