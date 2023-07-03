import React, { useEffect, useState } from 'react';
import cn from 'classnames';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { User } from '../types/User';
import * as authorAction from '../features/author/author';
import * as postsAction from '../features/posts/posts';
import * as selectedPostAction from '../features/selectedPost/selectedPost';

export const UserSelector: React.FC = () => {
  const [expanded, setExpanded] = useState(false);
  const dispatch = useAppDispatch();
  const { users } = useAppSelector(state => state.users);
  const { author } = useAppSelector(state => state.author);

  const setAuthor = (user: User) => {
    dispatch(authorAction.setAuthor(user));
    dispatch(postsAction.init(user.id));
    dispatch(selectedPostAction.clear());
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
          {users.map(user => (
            <a
              key={user.id}
              href={`#user-${user.id}`}
              onClick={() => {
                setAuthor(user);
              }}
              className={cn('dropdown-item', {
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
