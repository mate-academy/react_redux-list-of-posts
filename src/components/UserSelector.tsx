import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import * as authorActions from '../features/author';
import * as selectedPostActions from '../features/selectedPost';
import * as postsActions from '../features/posts';
import * as usersActions from '../features/users';

export const UserSelector: React.FC = () => {
  const {
    users: { items: users },
    author: { value: author },
  } = useAppSelector(state => state);
  const [expanded, setExpanded] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(usersActions.init());
  }, [dispatch]);

  useEffect(() => {
    if (author) {
      dispatch(selectedPostActions.actions.clear());
      dispatch(postsActions.init(author.id));
    } else {
      dispatch(postsActions.actions.clear());
    }
  }, [author, dispatch]);

  useEffect(() => {
    if (!expanded) {
      return;
    }

    const handleDocumentClick = () => setExpanded(false);

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
          onClick={e => {
            e.stopPropagation();
            setExpanded(current => !current);
          }}
        >
          <span>{author?.name || 'Choose a user'}</span>

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
              onClick={() => dispatch(authorActions.actions.set(user))}
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
