import { useEffect, useState } from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectUsers } from '../features/users/usersSlice';
import { selectAuthor, setAuthor } from '../features/users/authorSlice';

export const UserSelector = () => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector(selectUsers);
  const { author } = useAppSelector(selectAuthor);

  const [expanded, setExpanded] = useState(false);

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
    <div className={classNames('dropdown', { 'is-active': expanded })}>
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setExpanded(current => !current)}
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
            <Link
              key={user.id}
              to={`user-${user.id}`}
              onClick={() => dispatch(setAuthor(user))}
              className={classNames('dropdown-item', {
                'is-active': user.id === author?.id,
              })}
            >
              {user.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
