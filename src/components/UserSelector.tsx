import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import * as usersSelector from '../features/users/usersSlice';
import { setAuthor } from '../features/author/authorSlice';
import { loadPosts } from '../features/posts/postsSlice';
import { setSelectedPost } from '../features/selectedPost/selectedPostSlice';

export const UserSelector: React.FC = () => {
  const dispatch = useAppDispatch();

  const users = useAppSelector(state => state.users);
  const selectedUser = useAppSelector(state => state.author);

  useEffect(() => {
    dispatch(usersSelector.loadUsers());
  }, [dispatch]);

  const [expanded, setExpanded] = useState(false);

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

  const handleUserSelect = (userId: number) => {
    dispatch(setAuthor(users.find(user => user.id === userId)));
    dispatch(loadPosts(userId));
    dispatch(setSelectedPost(null));
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
              onClick={() => handleUserSelect(user.id)}
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
