import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { setAuthor } from '../features/Author/authorSlice';
import { useAppDispatch } from '../app/hooks';
import { User } from '../types/User';

export const UserSelector: React.FC = ({}) => {
  const dispatch = useAppDispatch();

  const users = useSelector((state: RootState) => state.users);
  const author = useSelector((state: RootState) => state.author);

  const [expanded, setExpanded] = useState(false);

  const handleSetAuthor = (user: User) => {
    if (author.value?.id !== user.id) {
      dispatch(setAuthor(user));
    }
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
          onClick={e => {
            e.stopPropagation();
            setExpanded(current => !current);
          }}
        >
          <span>{author.value?.name || 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.status === 'idle' &&
            users.users.map(user => (
              <a
                key={user.id}
                href={`#user-${user.id}`}
                onClick={() => handleSetAuthor(user)}
                className={classNames('dropdown-item', {
                  'is-active': user.id === author.value?.id,
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
