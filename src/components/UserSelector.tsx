import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { set } from '../features/author';
import { resetComments } from '../features/comments';
import { User } from '../types/User';

export const UserSelector = () => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector(state => state.users);
  const [expanded, setExpanded] = useState(false);

  const selectedUser = useAppSelector(state => state.author.author);

  const handleDropdown = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.stopPropagation();
    setExpanded(current => !current);
  };

  const handleUserSelection = (user: User) => {
    dispatch(resetComments());
    dispatch(set(user));
  };

  useEffect(() => {
    if (!expanded) {
      return;
    }

    const handleDocumentClick = () => {
      setExpanded(false);
    };

    document.addEventListener('click', handleDocumentClick);

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
          onClick={event => handleDropdown(event)}
        >
          <span>{selectedUser?.name || 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => {
            const { id, name } = user;

            return (
              <a
                key={user.id}
                href={`#user-${id}`}
                onClick={() => handleUserSelection(user)}
                className={classNames('dropdown-item', {
                  'is-active': id === selectedUser?.id,
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
