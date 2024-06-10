import { FC, useEffect, useState } from 'react';
import cn from 'classnames';

import { useAppDispatch, useAppSelector } from '../app/hooks';
import { setAuthor } from '../features/author/authorSlice';
import { User } from '../types/User';
import { setPost } from '../features/post/postSlice';

export const UserSelector: FC = () => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector(state => state.users);
  const { author } = useAppSelector(state => state.author);

  const [expanded, setExpanded] = useState(false);

  const handleUserClick = (user: User) => {
    if (user.id !== author?.id) {
      dispatch(setAuthor(user));
      dispatch(setPost(null));
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
      className={cn('dropdown', { 'is-active': expanded })}
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
          <span>{author ? author.name : 'Choose a user'}</span>

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
              className={cn('dropdown-item', {
                'is-active': user.id === author?.id,
              })}
              onClick={() => handleUserClick(user)}
            >
              {user.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
