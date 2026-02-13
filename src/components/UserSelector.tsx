import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { RootState, AppDispatch } from '../app/store';
import { fetchUsers } from '../features/usersSlice';
import { setAuthor } from '../features/authorSlice';
import { clearPosts } from '../features/postsSlice';
import { clearSelectedPost } from '../features/selectedPostSlice';
import { clearComments } from '../features/commentsSlice';
import { User } from '../types/User';

export const UserSelector: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { items: users } = useSelector((state: RootState) => state.users);
  const selectedUser = useSelector((state: RootState) => state.author.current);

  const [expanded, setExpanded] = useState(false);

  useEffect(() => {
    dispatch(fetchUsers());
  }, [dispatch]);

  useEffect(() => {
    if (!expanded) {
      return;
    }

    const handleDocumentClick = () => setExpanded(false);

    document.addEventListener('click', handleDocumentClick);

    return () => document.removeEventListener('click', handleDocumentClick);
  }, [expanded]);

  const handleSelect = (user: User) => {
    dispatch(setAuthor(user));
    setExpanded(false);
    dispatch(clearPosts());
    dispatch(clearSelectedPost());
    dispatch(clearComments());
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
            setExpanded(current => !current);
          }}
        >
          <span>{selectedUser?.name || 'Choose a user'}</span>

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
              onClick={e => {
                e.preventDefault();
                handleSelect(user);
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
