import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';
import { getUsers } from '../api/users';
import * as authorActions from '../features/authorSelector';
import { useAppDispatch, useAppSelector } from '../app/hooks';

export const UserSelector = () => {
  const dispatch = useAppDispatch();
  const [users, setUsers] = useState<User[]>([]);
  const [expanded, setExpanded] = useState(false);
  const author = useAppSelector(state => state.author);

  const handleSelectAuthor = (user: User) => {
    dispatch(authorActions.addAuthor(user));
    dispatch(authorActions.init(user.id));
  };

  useEffect(() => {
    getUsers()
      .then(response => setUsers(response));
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
            {author.author?.name || 'Choose a user'}
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
              onClick={() => handleSelectAuthor(user)}
              className={classNames('dropdown-item', {
                'is-active': author.author && user.id === author.author.id,
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
