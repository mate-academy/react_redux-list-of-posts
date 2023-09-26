/* eslint-disable consistent-return */
import {
  useCallback,
  useEffect,
  useState,
} from 'react';
import classNames from 'classnames';
import { User } from '../types/User';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import { actions as authorActions } from '../features/authorSlice';
import { fetchUsers } from '../features/userSlice';

export const UserSelector = () => {
  const dispatch = useAppDispatch();
  const { users } = useAppSelector((state) => state.users);
  const { author } = useAppSelector((state) => state.author);
  const [expanded, setExpanded] = useState(false);

  const handleSelectAuthor = useCallback((user: User) => {
    dispatch(authorActions.setAuthor(user));
  }, []);

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

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

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown',
        { 'is-active': expanded })}
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
          {users.map(currentUser => (
            <a
              key={currentUser.id}
              href={`#user-${currentUser.id}`}
              onClick={() => handleSelectAuthor(currentUser)}
              className={classNames('dropdown-item', {
                'is-active': currentUser.id === author?.id,
              })}
            >
              {currentUser.name}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};
