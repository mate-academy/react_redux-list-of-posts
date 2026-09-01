import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { fetchUsers } from '../features/users/usersSlice';
import { setAuthor } from '../features/author/authorSlice';
import { clearPosts, fetchPosts } from '../features/post/postsSlice';
import { setSelectedPost } from '../features/selectedPost/selectedPostSlice';
import { clearComments } from '../features/comments/commentsSlice';
import { User } from '../types/User';

export const UserSelector: React.FC = () => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(state => state.users);
  const author = useAppSelector(state => state.author);

  const [expanded, setExpanded] = useState(false);

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

  const handleSelectUser = (user: User) => {
    if (author?.id === user.id) {
      setExpanded(false);

      return;
    }

    dispatch(setAuthor(user));
    dispatch(setSelectedPost(null));
    dispatch(clearComments());
    dispatch(clearPosts());
    dispatch(fetchPosts(user.id));
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
              onClick={e => {
                e.preventDefault();
                handleSelectUser(user);
              }}
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
