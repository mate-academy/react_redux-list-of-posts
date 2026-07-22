import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectAuthor } from '../features/author';
import { fetchUsers } from '../features/users';
import { setLoaded, setPosts } from '../features/posts'; // Импортируем сброс постов
import { setSelectedPost } from '../features/selectedPost';

export const UserSelector: React.FC = () => {
  const [expanded, setExpanded] = useState(false);

  const dispatch = useAppDispatch();
  const users = useAppSelector(state => state.users.items);
  const selectedUser = useAppSelector(state => state.author.currentAuthor);

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

    return () => {
      document.removeEventListener('click', handleDocumentClick);
    };
  }, [expanded]);

  const handleUserSelect = (user: (typeof users)[0]) => {
    if (selectedUser?.id !== user.id) {
      dispatch(setPosts([]));
      dispatch(setLoaded(false));
      dispatch(setSelectedPost(null));
      dispatch(selectAuthor(user));
    }
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
              onClick={() => handleUserSelect(user)}
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
