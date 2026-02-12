import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { loadPosts } from '../features/posts';
import { User } from '../types/User';
import { setCurrentUser } from '../features/author';

type Props = {};

export const UserSelector: React.FC<Props> = ({}) => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(state => state.users);
  const author = useAppSelector(state => state.author);
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

  const handleOpenUserPosts = (currentUser: User) => {
    dispatch(setCurrentUser(currentUser));
    dispatch(loadPosts(currentUser.id));
    setExpanded(false);
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
          onClick={e => {
            e.stopPropagation();
            setExpanded(prev => !prev);
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
          {users.map(userItem => (
            <a
              key={userItem.id}
              href={`#user-${userItem.id}`}
              onClick={e => {
                e.stopPropagation();
                handleOpenUserPosts(userItem);
              }}
              className={classNames('dropdown-item', {
                'is-active': author?.id === userItem.id,
              })}
            >
              {userItem.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
