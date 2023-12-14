import React, { useEffect, useState } from 'react';
import classNames from 'classnames';
import { User } from '../types/User';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { selectUsers } from '../features/users/usersSlice';
import { loadPosts, setAuthor } from '../features/author/authorSlice';
import { clearPost } from '../features/post/postSlice';

type Props = {
  value: User | null;
};

export const UserSelector: React.FC<Props> = ({ value: selectedUser }) => {
  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsers);
  const [expanded, setExpanded] = useState(false);

  const handleUserSelect = (user: User) => {
    if (selectedUser?.id === user.id) {
      return;
    }

    dispatch(setAuthor(user));
    dispatch(loadPosts(user.id));
    dispatch(clearPost());
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
          onClick={() => {
            setExpanded((current) => !current);
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
          {users.map((user) => {
            const { id, name } = user;

            return (
              <a
                key={id}
                href={`#user-${id}`}
                onClick={() => {
                  handleUserSelect(user);
                }}
                className={classNames('dropdown-item', {
                  'is-active': id === selectedUser?.id,
                })}
              >
                {name}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};
