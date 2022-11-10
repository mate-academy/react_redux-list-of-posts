import React, {
  useEffect,
  useState,
} from 'react';
import classNames from 'classnames';
import {
  selectCurrentUser,
  selectUsers, setCurrentUser,
} from '../features/users/usersSlice';
import {
  useAppDispatch,
  useAppSelector,
} from '../app/hooks';
import {
  getPostsAsync,
  resetCurrentPost,
} from '../features/posts/postsSLice';
import { User } from '../types/User';

type Props = {
};

export const UserSelector: React.FC<Props> = () => {
  const [expanded, setExpanded] = useState(false);

  const dispatch = useAppDispatch();
  const users = useAppSelector(selectUsers);

  const selectedUser = useAppSelector(selectCurrentUser);

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

  const userSelectHandler = (user: User) => {
    dispatch(resetCurrentPost());
    dispatch(setCurrentUser(user));
    dispatch(getPostsAsync(user.id));
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
          onClick={() => {
            setExpanded(current => !current);
          }}
        >
          <span>
            {selectedUser?.name || 'Choose a user'}
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
              onClick={() => userSelectHandler(user)}
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
