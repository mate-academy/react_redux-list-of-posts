import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchUsers } from '../features/usersSlice';
import { actions as authorActions } from '../features/authorSlice';
import { User } from '../types/User';

export const UserSelector = () => {
  const { users } = useAppSelector(state => state.users);
  const { author } = useAppSelector(state => state.author);
  const dispatch = useAppDispatch();

  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers());
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

  const handleAuthorSelect = (
    e: React.MouseEvent<HTMLAnchorElement>,
    selectedAuthor: User,
  ) => {
    e.preventDefault();
    dispatch(authorActions.setAuthor(selectedAuthor));
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
          onClick={(e) => {
            e.stopPropagation();
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
          {users.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              // eslint-disable-next-line @typescript-eslint/no-shadow, max-len
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => handleAuthorSelect(e, user)}
              className={classNames('dropdown-item', {
                'is-active': user.id === author?.id,
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
